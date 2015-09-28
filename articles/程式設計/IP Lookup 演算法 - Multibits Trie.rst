##################################################
IP Lookup 演算法 - Multibits Trie
##################################################

:date: 2013-05-06

「Binary Trie」這個演算法非常簡單易懂，而且也相當好實作。但在搜尋的速度上，
仍有許多待改進的空間，最大的問題在於「Binary Trie」這個演算法建立的二元搜尋樹太深了！
1 個位元一層， 32 個位元就可能要往下 32 層，也就是說可能就要比較 32 次才會得到結果，
自然效果不太好。

於是有人問了：「為什麼要這麼麻煩呢？既然一個位元一個位元比較速度不夠快，
那一次比較好幾個位元不就得了？」

於是「Multibits Trie」這個演算法因應而生，它的概念和「Binary Trie」沒什麼不同，
差別在「Multibits Trie」會一次比較多個位元來減少層數，用這種方法增加搜尋的速度。

.. site-image:: 1.png
    :source: IP Lookup 演算法 - Multibits Trie

「stride」代表一次看幾個位元，所以上圖左代表「stride」為 2 的樹。
理論上「stride」值越多，樹的層數也會相應得變少。

不過這樣一來，就會產生新的問題，其實從圖中就可以看得出來，雖然層數變少了，
但是節點數卻增加了！換言之，就是所需要的記憶體增加了！為什麼會發生這種情況呢？
原因很簡單，因為本來「Binary Trie」是一個位元一個位元比較，
一直比到 Prefix 的長度為止(因為超過 Prefix 的長度的話，之後不管值是什麼都沒關係)。

但「Multibits Trie」是一次看數個位元，很可能會碰到要比較位元已經超過 Prefix 長度的情況，
好比說我一次看 2 個位元，但後面的位元本來是不用看的。

如下表

======== ================
 Prefix   Nexthop
 1***     粉紅色的出口
======== ================

(這個例子中，只要看 1 個位元即可，後面都不需要看，但若我是要 2 個位元 2 個位元看，
第 2 個位元就超過 Prefix 長度了)


那怎麼辦呢？解決問題的方法也很簡單，比如說剛剛的例子，
只要列出所有的長度既是「stride」的倍數，而且又能包含原來 Prefix 的所有可能的新 Prefix 即行了。

像剛才的例子，就可以用新的兩條規則取代舊的規則，如下表

============= ============================
Prefix        Nexthop
10**          粉紅色的出口
11**          粉紅色的出口
============= ============================

這樣一來，意義不變，但是卻可以方便我們建立節點。

不過用這種方法又會產生新的問題，因為規則的 Prefix 是我們自己變長的(上例是從 1 變 2)，
所以若碰到原來 Prefix 就是 2，而且又是共用同一個節點存放「Nexthop資訊」時，
就會有優先權的問題。幸好這個問題也很好解決，只要紀錄原來的 Prefix 長度，
等到碰到共用同一個節點的情況時，比較原來的 Prefix 長度，把舊的蓋掉即可。


關於搜尋的範例程式碼

.. code-block:: python

    def search(root, ip, stride):
        current = root
        nexthop = root.nexthop #預設值，此例直接把預設值放在 root 中。

        length = 0
        while length < 32 and current:
            length += stride #Binary Trie 時是一次 shift 1，現在是一次 stride 個
            index = (ip >> (32 - length)) & (pow(2, stride) - 1)
            current = current.children[index]

            if current and current.nexthop != None:
                nexthop = current.nexthop

        return nexthop

若比較「Binary Trie」的搜尋的程式碼，就會發現兩者非常相似，
差別在於一次看的的位元數目不同而已，還有「Binary Trie」每個節點都只會有兩個子節點，
「Multibits Trie」則會因「stride」不同而有不同的子節點數目僅此而已。

因此在「Binary Trie」中，我取「left」、「right」代表左子節點和右子節點，
而在「Multibits Trie」時，因為不會只有兩個子節點，所以用串列「children」代表子節點。

接下來是建立樹的部分，概念上和「Binary Trie」大同小異，只是多了兩個關鍵點，分別是：

* 把長度不是「stride」的倍數的 Prefix 展開成多個 Prefix
* 碰到 Prefix 長度相同的規則比較其優先權(自己變的當然優先權會比較小)

.. code-block:: python

    def create_tree(entrys, stride):
        root = Node(stride)

        #prefix, nexthop 表各別的規則
        for prefix, nexthop in entrys:

            # /0 表預設值
            if entry.prefix.length == 0:
                root.nexthop = nexthop
                root.length = prefix.length #紀錄 prefix 的長度，之後可以用來比較優先權
            else:

                #bit_count 表不足一個 stride 的位元個數
                bit_count = (32 - prefix.length) % stride

                #把長度不是「stride」的倍數的 Prefix 展開成多個 Prefix
                new_prefixs = []
                if bit_count != 0:
                    for i in range(pow(2, bit_count)):
                        new_prefix = Prefix()
                        new_prefix.length = prefix.length + bit_count

                        new_prefix.ip = prefix.ip >> (32 - prefix.length) << (32 - prefix.length)
                        new_prefix.ip += i << ( 32 - new_prefix.length)

                        new_prefixs.append(new_prefix)
                else:
                    new_prefixs.append(prefix)

                for new_prefix in new_prefixs:
                    current = root
                    length = 0
                    while length < new_prefix.length:
                        length += stride
                        index =  (new_ip >> (32 - length)) & (pow(2, stride)-1)
                        if current.children[index] == None:
                            current.children[index] = Node(stride)
                        current = current.children[index]

                    #用 prefix 的長度比較優先權
                    if prefix.length > current.length:
                        current.nexthop = nexthop
                        current.length = prefix.length


「Multibits Trie」演算法可以有效的增加搜尋的速度，不過代價是必須要付出更多的記憶體。
這個演算法非常實用，建立、更新、搜尋都有不錯的效果，根據我導師的說法，雖然這個演算法非常基本，
但現在業界其實都是只在用這種演算法而已。

所以說，有研究相關領域的人，這個演算法鐵定要非常熟悉才是。
