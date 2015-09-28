##################################################
IP Lookup 演算法 - Binary Trie
##################################################

:date: 2013-05-06

Binary Trie 恐怕是 IP lookup 最簡單的演算法，它的概念非常直覺，也非常好懂。

.. site-image:: 1.png
    :source: IP Lookup 演算法 - Binary Trie

為了方便說明，所以假設 IP 只會有 4 個位元(實際上 IPv4 會有 32 個位元)，
上圖代表「Binary Trie」的架構圖，圖左是所建立的「Binary Search Tree」，
圖右是路由表的規則，如第一項是「0 \*」，代表「0 * 時就會丟到相應的 Nexthop」，
在此使用不同的顏色表示相應的「Nexthop」，
如紫色就表示會走紫色的「Nexthop」 (實際上自然不會用顏色判斷)。
而左邊的則是依照路由表所建立的二元樹，節點上有 0、1 兩種數字，
而有顏色的節點則代表有「Nexthop 資訊」的節點。

「Binary Trie」的運作方式很簡單，這個演算法會建立一個二元樹，
而有些節點會包含有關「Nexthop 資訊」(也就是圖中的有顏色的節點)，
當新的 IP 進來時，就會從 IP 的最左邊往右開始比對，從樹的根節點開始，
碰到 0 便往左子節點，到到 1 便往右節點，以此類推，一直到葉節點或沒有對應節點為止，
這時中間經過的節點中(包含最後一個節點)，
最後一次出現的「Nexthop資訊」就是我們要的答案。

.. site-image:: 2.png
    :source: IP Lookup 演算法 - Binary Trie

為什麼要是最後一個有「Nexthop 資訊」的就是答案呢？
其實中途只要碰到有「Nexthop 資訊」的節點，
就表示無論接下來的子節點是什麼都還是會符合該條規則，
只是因為路由器搜尋的規則是「Longest prefix match」,也就是說單是符合規則還不夠，
我們還要最長、最精確的那一項，所以才會選擇最後一次碰到的結果。

上圖中，綠色的規則因為比較長，所以會比紫色的還晚得到結果。

完整的搜尋程式碼大致如下

.. code-block:: python

    def search_binary_search_tree(root, ip):

        nexthop = root.nexthop #預設值，此例直接把預設值放在 root 中。

        current = root

        ip_length = 4 #若為真實世界的 ip 則是 32
        length = 0
        while length < ip_length and current:  
            length += 1

            #碰 0 找左子節點，碰 1 找右子節點
            if (ip >> (ip_length - length)) & 1: 
                current = current.right
            else: 
                current = current.left

            #若有 nexthop 資訊，則紀錄下來
            if current and current.nexthop != None:
                nexthop = current.nexthop

        return nexthop
 


知道搜尋的原理，那就開始建立二元樹了。

.. code-block:: python

    def create_binary_search_tree(entrys):
        root = BinarySearchTreeNode()
            
        #prefix, nexthop 表各別的規則
        for prefix, nexthop in entrys:
            current = root

            #通常 /0 表預設值，此例中，預設值直接放在 root.nexthop 中
            if prefix.length != 0: 
                length = 0 

                #如果超過 prefix 表 don't care
                while length < prefix.length: 
                    length += 1

                    #遇 0 往左，遇 1 往右
                    if (prefix.ip >> (32 - length)) & 1:
                        if current.right == None:
                            current.right = BinarySearchTreeNode()
                        current = current.right
                    else:
                        if current.left == None:
                            current.left = BinarySearchTreeNode()
                        current = current.left

            #紀錄 nexthop 資訊
            current.nexthop = nexthop
 
建立的方式相當容易了解，也就是照著路由表一個個往下建樹的節點，
直到建完為止。這個方法雖然簡單，但在最糟的情況下，樹高會是 32 ，
換句話說，可能要往下走 32 層才能找到我要的資訊，所以這個方法雖然簡單，
但效率並不好。
