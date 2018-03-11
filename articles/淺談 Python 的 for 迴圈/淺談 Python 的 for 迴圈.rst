淺談 Python 的 for 迴圈
##########################

:date: 2013-10-08
:modified_date: 2018-03-11
:categories: Python;程式設計

.. note:: 本文以 Python 2 為例。

for 迴圈的基本運作
====================

為何會需要迴圈呢？

因為世上有許多相似甚至完全相同的事情，而我卻不想一一手動列舉，好比在螢幕上依序印出二十六個英文字母。如果仔細分析，便可發現每一字母除了字母本身不同外，其餘皆是相同地使用「print」印出。而我自然不希望每個字母都得寫一遍「print」，這不是太麻煩了嗎？

.. code-block:: python

    # 顯示所有英文字母
    print "A"
    print "B"
    print "C"
    ...
    print "Z"  # 重覆寫 26 遍 print 太麻煩！

況且很多時候「需要重覆幾次」，得在實際運行期間才知道。舉例來說，我需要從資料庫抓取所有使用者的名稱來顯示，而在撰寫程式碼的時候我顯然不會預先知曉共有幾位使用者，因此即使我真想一個個手動輸入「print」也不行。

這時 for 迴圈便可登場了！套用上例，我們可先將抓出來的使用者先存進 name_list 串列中，再由迴圈將所有名稱顯示一遍：

.. code-block:: python

    for name in name_list:
        print name

「for」和「in」是 Python 的關鍵字，兩者之間可以放置使用者自訂的變數，而「in」後則可接一個序列(Sequence)，串列(list)、字串(str)、元組(tuple) 等皆是序列的一種。

迴圈會依序從序列取得元素，並將元素指定給前面自訂的變數(此例為 name)，再執行迴圈裡的內容，直到序列每一元素都被取出過為止。

這裡插播一個 Python 的用法，Python 可以使用這種方式指定變數：

.. code-block:: python

    item = ("小雞", 100)  # 這裡 item 會等於 ("小雞", 100) 

    # 也可以這麼做
    (name, grade) = ("小雞", 100)  # 這裡 name 會等於「小雞」，grade 會等於「100」

    # 括號本身也可以省略
    name, grade = ("小雞", 100)  # 結果於上一句相同

這種用法在 for 迴圈指定變數時也適用，序列裡的元素也是可以被拆解並直接指定對應的變數，像下面這樣：

.. code-block:: python

    grade_list = [("小雞", 100), ("兩大類", 0), ("小喵", 80), ("小蟲", 60)]
    for item in grade_list:
        print item[0], item[1]

    # 可以直接改寫
    for (name, grade) in grade_list:
        print name, grade
    
    # 或是這樣
    for name, grade in grade_list:
        print name, grade

.. note:: 想一想：這裡是使用元組拆解，那麼如果是串列可不可以呢？

看到此處，想必很多讀者就會發現 python 的迴圈其實就是其他語言 foreach 的用法。與其他語言不同，其他語言的 for 使用邏輯通常是「找出序列所有可能的索引(index)，再透過索引取得序列對應的資料」，碰到上面的情況，C++ 的使用者會這麼做：

.. code-block:: c++

    for(int i = 0; i < name_list.size(); i++)
        std::cout << name_list[i] << std::endl;

如果要在 Python 模擬這個概念，就會像這樣：

.. code-block:: python

    for index in range(len(name_list)):
        print name_list[index]

.. note:: range 函式會依據參數回傳一個整數數列，假設輸入 10 便會回傳 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

明顯麻煩許多，顯然 Python 更希望我們以 foreach 的用法取代其他語言使用 for 的方式。

為何如此？

道理很簡單，比較兩種方式，可以發現 foreach 的用法明顯擁有更高的可讀性。比如在此例中，用變數 name 來表示名稱顯然比用 name_list[i] 還要直覺。而且更重要的是，在大多數情況下，我們其實根本就不需要索引的資訊，何必多此一舉，先找到索引，然後才取得序列的元素內容呢？

話說回來，那碰到需要索引資訊的情況又該如何？難道又得回到之前可讀性差的做法嗎？

不需要。

因為 Python 提供了 enumerate 函式，可以漂亮地解決該問題，這個函式可以接受一個序列當參數，然後回傳一個新序列，新序列的每一個元素都是一個元組，包含了一個連續整數和原來的元素，就像下面這樣：

.. code-block:: python

    >>> name_list = ["小雞", "兩大類", "小喵", "小蟲"]
    >>> enumerate(name_list)
    [(0, "小雞"), (1, "兩大類"), (2, "小喵"), (3, "小蟲")]  # 實際上是一個 generator ，這只是為了方便解釋。

這樣我們就可以在保持可讀性的情況下解決問題：

.. code-block:: python

    for index, name in enumerate(name_list):
        print index, name

此外 Python 的 for 迴圈還有一個異於其他語言的用法，那就是可以使用關鍵字「else」：

.. code-block:: python

    for name in name_list:
        print name
    else:
        print "以上就是所有的名稱"

當序列所有的元素都被取出，進行完最後一次迴圈後，便會執行 else 裡的內容。舉例來說，上面例子的結果會顯示：

::

    小雞
    兩大類
    小喵
    小蟲
    以上就是所有的名稱

或許你會好奇，既然最後才會執行，為何不直接放到迴圈外呢？

因為這還可以搭配關鍵字「break」使用，只要使用 break 中途跳出迴圈的話，就不會執行 else 的內容。我們用「找質數」來舉例：

.. code-block:: python

    #找 0 ~ 100 所有的質數
    for num in range(100):
        for i in range(2, num):
            if num % i == 0:
                break
        else:
            print num, "是一個質數"

.. note:: 關鍵字 continue 不算是跳出迴圈，所以就算在最後一圈使用 continue，還是會執行 else 裡的內容。

嚴格說起來，真要丟到迴圈外處理也不難，此例來說，由於 Python 在迴圈指定的變數(此例是 num)，在迴圈結束後還會保留，所以我一樣可以判斷迴圈是不是進行到最後一圈才結束：

.. code-block:: python

    for num in range(100):
        for i in range(2, num):
            if num % i == 0:
                break
        if i == num - 1:
            print num, "是一個質數"

我認為 else 最大的意義在於其擁有比較好的可讀性，可以輕易的展現 else 裡的內容和迴圈的關聯性。相對來說，上面的程式碼就比較難一眼看出 if 和前面迴圈的關係。 

.. note:: 不過這點可能見仁見智，對於其他語言轉過來的人而言，這種做法可能反而增加閱讀的困難，所以還是得看場合使用。

還有一點要記得－－在 Python 中並不是所有型態的序列都可以在 for 迴圈運行時新增或刪除元素，因為這個動作有潛在的風險，所以有些型態直接限制了這項操作。

怎麼說呢？

我們可以反過來看，准許你在迴圈中新增或刪除元素的類型，像是串列，其使用上可能會有什麼問題。

簡單來說，你可以想像在迴圈運作時，會有一個計數器紀錄迴圈進行的圈數，每做一次迴圈，計數器就會加一。透過這個計數器，程式就會知道接下來要處理的是那一個變數。

這時我們在中途新增或刪除元素時，由於計數器的值沒有改變，那麼藉由「原來的計數器」取出「新的序列」的元素，自然就有可能出錯。比如說：

.. code-block:: python

    num_list = [1, 2, 3]
    for num in num_list:
        print num
        num_list.remove(num)
    print num_list

運行結果，你可能會以為是：

::

    1
    2
    3
    []

但實際上會是：

::

    1
    3
    [2]

要解決這個問題也不難，只要我們複製一份暫存的版本就行了：

.. code-block:: python

    num_list = [1, 2, 3]
    for num in num_list[:]:
        print num
        num_list.remove(num)
    print num_list

實作一個可以被當成序列的物件
=============================

在 Python 中，如果物件有實作 __getitem__ 函式或 __iter__ 函式時就能被當成序列。
但如果兩個函式都有實作，那麼 Python 會先嘗試呼叫  __iter__ ，如果發現沒有實作這個函式時，才會呼叫 __getitem__。 

首先來介紹 __getitem__ 函式，這個函式的意義是讓物件可以用 object[index] 這種方式取得資料。我們可以輸入索引值，然後回傳對應位置的元素。索引值必須從零開始，而且在超過元素個數時，擲出 IndexError 異常：

.. code-block:: python

    class MySequence(object):
        
        # ...

        def __getitem__(self, index):
            if index > self.max_index:
                raise IndexError
            return self.get_element_by_index(index)

只要實作了這個函式，就可被當成序列給迴圈處理，運作的過程感覺就像下面這樣：

::

    1. 取得 my_sequence[0] 當作元素，然後執行迴圈裡面的內容
    2. 取得 my_sequence[1] 當作元素，然後執行迴圈裡面的內容
    3. 取得 my_sequence[2] 當作元素，然後執行迴圈裡面的內容
    4. ...(不斷重覆，直到嘗試取得 my_sequence[n] 時發生 IndexError 異常)
    5. 結束迴圈

但這其實是舊式的做法(說不準未來會不會淘汰的方法)，現在 Python 會比較推薦使用 __iter__ 的方式。

這種方式迴圈並不會直接與序列溝通，而是間接由一個「迭代器(iterator)」物件來取得序列的元素。迴圈先利用序列的 __iter__ 取得迭代器，然後再藉由迭代器的 next 函式取得序列的每一個元素。

呼叫 next 函式時不需要任何參數，這個函式每次呼叫都會回傳序列還沒出現過的元素，直到每一個元素都已經被回傳過了為止。此時如果再這個函式，就會擲出 StopIteration 異常來表示序列每個元素都被回傳過了，感覺就像是下面這樣：

::

    1. 呼叫 my_sequence 的 __iter__ 函式取得迭代器
    2. 呼叫迭代器的 next 函式取得序列元素，然後執行 for 迴圈裡面的內容
    3. 呼叫迭代器的 next 函式取得序列元素，然後執行 for 迴圈裡面的內容
    4. 呼叫迭代器的 next 函式取得序列元素，然後執行 for 迴圈裡面的內容
    5. ...(不斷重覆，直到發生 StopIteration 異常)
    6. 結束迴圈

.. note:: 如果發生 StopIteration 異常後，又再一次呼叫 next 會發生什麼事情呢？ 會－－繼續賞你一個 StopIteration 異常。

簡單來說，我們必須弄出一個迭代器給序列的 __iter__ 回傳。要實作一個迭代器必須完成兩個條件，一是實作前文所敘的 next 函式，二是實作屬於迭代器的 __iter__。不過迭代器的 __iter__ 只需要回傳自己(self)即可，這是因為 Python 希望迭代器本身也要能進行迴圈。換言之，即使不實作迭代器的 __iter__ 也沒關係，所屬的序列還是可以進行迴圈。

實作的結果可能會像下面這樣：

.. code-block:: python

    #序列的 __iter__ 函式必須回傳一個迭代器
    class MySequence:
        ...
        def __iter__(self):
            return MyIterator()

    class MyIterator:
        ...

        # 就算不實作此函式，MySequence 還是可以迴圈
        def __iter__(self):
            return self

        def next(self):
            self.count += 1
            if self.count > self.max_count:
                raise StopIteration
            return self.get_element_by_count(self.count)


.. note:: 至於這裡為何是 StopIteration 異常而不是 IndexError 異常，理由是為了避免 next 函式真的發生 IndexError 而無法判斷。

簡單來說，一個物件要能被當作序列使用，就必須實作 __getitem__ 或是 __iter__ 函式。

但說真的，自己實作迭代器其實也是挺麻煩的，有沒有辦法可以簡單的產生迭代器呢？有的，那就是使用 yield。不過因為受限於篇幅的原因，所以這裡不討論它的詳細用法，有興趣的可以自己去查相關資料：

.. code-block:: python

    def iterator():
        for num in range(10):
            yield num

    def num in iterator():
        print num

除外，有時我們也可能會碰到「感覺上很適合給 for 迴圈使用」的函式，這種函式的行為很像迭代器，可以不斷吐出一個個元素。一個很經典的例子就是檔案物件(file object)的 readline 函式，這個函式可以一行行讀出檔案的內容，感覺上就像是迭代器一個個吐出元素一樣。但因為這是一個函式，而不是迭代器，所以不能給 for 迴圈使用。

碰到這種情況，我們可以用 iter 函式來幫助我們，這個函式可以為我們「包裝」成一個迭代器來使用，其主要有兩種用法，第一種用法是輸入一個物件當參數，然後這個函式會直接呼叫該物件實作的 __iter__ 函式的結果當回傳值。

第二種用法就是我要提的，我們可以輸入兩個參數給這個函式，第一個參數是所要執行的函式，第二個參數則是迭代器中止的條件，其中如果函式回傳的結果和第二個參數的值相等，就會擲出 StopIteration 異常，因此上述的例子就可以這麼做：

.. code-block:: python

    with open("我的檔案.txt") as fp:
        for line in iter(fp.readline, ""):
            print line

是不是很簡單呢？

淺談完畢，謝謝看完的各位。 
