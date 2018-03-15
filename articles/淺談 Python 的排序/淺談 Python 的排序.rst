淺談 Python 的排序
##########################

:date: 2013-12-03
:modified_date: 2018-03-15
:categories: Python;程式設計

.. note:: 本文以 Python 2 為例。

排序，即是將一組資料依據使用者的需求重新排列，以便我們查詢和分析資料。

舉例來說，我想獎勵班上前三名的同學和處罰後三名的同學，就可以將全班同學依成績由高到低排序。如此一來，序列的前三位同學即前三名，後三位則為後三名，我可以輕易的鎖定目標，將後三名的同學的頭輕輕扭下來，送給前三名當球踢……

Python 的排序
==========================

1960 年代，電腦製造商曾經做過一項調查，發現他們製造的電腦有 25% 的計算時間是在「排序」上，很多電腦甚至遠遠超過這個數字。「排序」是如此重要，Python 自然會提供一些方法來協助我們解決有關排序的問題。

首先是獨立的 sorted 函式，使用方式非常直覺，所以我直接舉一個例子說明用法：

.. code-block:: python

    >>> grades = [50, 60, 40, 70, 40, 80, 30, 90, 20, 100, 10]
    >>> sorted(grades)
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

sorted 函式可以接受一個序列當參數，而後回傳已排序好的新序列，預設是由小排到大。要注意的是 sorted 函式會產生一個新序列來排序，並不會影響舊序列的內容。

如果是串列的話，還可以使用自帶的 sort 函式，一樣直接舉個例子：

.. code-block:: python

    >>> grades = [50, 60, 40, 70, 40, 80, 30, 90, 20, 100, 10]
    >>> grades.sort()
    >>> grades
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

與前者不同，sort 函式並沒有回傳值，它會直接排序串列的內容。也因為不用另外花時間建構一個新的序列回傳，因此這個函式的效率會比 sorted 函式好上一些，我們可以使用模組 timeit 證明這一點：

>>> python –mtimeit –s’import random' 'x=range(1000); random.shuffle(x)'
1000 loops, best of 3: 468 usec per loop
>>> python -mtimeit -s'import random' 'x=range(1000); random.shuffle(x); sorted(x)'
1000 loops, best of 3: 674 usec per loop
>>> python -mtimeit -s'import random' 'x=range(1000); random.shuffle(x); x.sort()'
1000 loops, best of 3: 662 usec per loop

總體來說，雖然兩者區別不大，功能也幾乎完全相同 (後面會詳細說明)，但如果只想記一種使用方式，我會更推薦使用 sorted 函式，除了 sorted 函式更加通用外，串列 (list) 提供的 sort 函式也比較容易誤用，比如說：

.. code-block:: python

    >>> sorted_list = list.sort()  # 錯誤！ sort 函式沒有回傳值

雖然我們了解沒有回傳值是為了避免混淆才這麼設計的，可是不熟悉的人還是很容易忘記這一點，常常會浪費許多時間在處理這種問題。所以我認為在沒有特殊需求時，使用 sorted 函式就行了。

當然，並不是說不能使用 sort 函式，我們還是可以視情況使用，但使用時不要忘記－－sort 函式會直接修改串列的內容，所以要確定原始的串列內容不需要保留才行。

.. note:: 注意！一個是 sorted，一個是 sort，拼法不同喔～

此外，這兩個函式還提供了一些參數來處理更複雜的排序問題。這裡我不分別說明兩者可接受的參數為何，因為除了sort 函式不需要接受序列當參數外，其餘參數完全相同，均有「reverse」、「cmp」和「key」三個參數可以使用。詳細怎麼使用呢？隨後會一一介紹：

參數 reverse
----------------

此參數很容易由字面上理解，如果輸入布林值 True，就會反轉排列的順序，原本由小排到大，就會變成由大排到小：

.. code-block:: python

    >>> grades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    >>> sorted(grades, reverse=True)
    [100, 90, 80, 70, 60, 50, 40, 40, 30, 20, 10]

參數 cmp
----------------

有時，一些特殊序列裡的元素可能無法直接比較大小，或著我們想要用自己的方式比較大小。比如說班上的同學有男有女，若把女生的頭扭下來，男女比可能就會變得不太漂亮。這時我們可以新增一個條件－－如果男生和女生比較的話，女生無條件勝出！碰到這種「現實社會碰到的複雜難題」，單純比較大小已經無法適用的情況，我們就可以使用參數 cmp。

透過這個參數，我們可以自行決定序列元素比較大小的方式(如女生一定比男生大)，只要指定一個「比較函式」給參數 cmp，那麼排序函式運行時，就會利用這個「比較函式」決定兩個元素之間的大小。

這個「比較函式」可以接受兩個元素當參數，並回傳兩者比較大小後的結果，如果前者比後者大，就會回傳正數；前者比後者小，就會回傳負數；兩者相等，則會回傳零。我們可以自行定義之。

.. code-block:: python

    # 自定的比較函式
    def compare(student1, student2): 
        if student1[0] == '女生' and student2[0] == '垃圾': 
            return 1  # 正數 student1 > student2
        elif student1[0] == '垃圾' and student2[0] == '女生': 
            return -1 # 負數 student1 < student2
        return student1[1] - student2[1]

    data = [ ('女生', 90), ('垃圾', 80), ('女生', 70), ('垃圾', 60)]    
    for grade, gender in sorted(data, reverse=True, cmp=compare):
        print grade, gender 
    
執行結果如下：

::

    90 女生
    70 女生 
    80 垃圾
    60 垃圾 

.. note::

    此例其實不用這麼麻煩，因為「女生」注定在「垃圾」之上，所以其實不需要參數 cmp，直接排序就好了，不服氣的話可以試試！

    (其實是因為 ASII 排序的關係)

參數 key
----------------

有時我們會碰到一種特殊情形－－我們想比較的不是序列的元素本身，好比說班上的排名，我們雖然是對學生做排序，但我們為學生排名時，真正想比較的不是學生本身，而是學生的成績。

碰到這種情況，有一種很常見的解決方式就是找出原序列元素的真正想比較的內容（如學生的分數）建立一個輔助序列，這個輔助序列與原序列的每一個元素可以一對一對應。接下來，只要排序這個輔助序列，我們就能知道原序列相應要如何排序了。

實際操作時，我們通常會為利用元組(tuple) 來達成這個目的：

.. code-block:: python

    class Student:
        def __init__(self, name, grade, gender):
            self.name = name
            self.grade = grade
            self.gender = gender
        def __repr__(self):
            return repr(self.name)
    
    data = [
        Student('小兜', 80, '垃圾'), Student('小雞', 90, '女生')
        Student ('小蟲', 60, '垃圾'), Student ('小喵', 70, '女生' )]
    
    #輔助序列，內容為 [(80, '小兜'), (90, '小雞'), (60, '小蟲'), (70, '小喵')]
    decorated_data = [ (student.grade, student) for student in data]

元組 (tuple) 排序時會由第一個先排，因此我們可以直接排序這個輔助序列。接下來，照順序把元組拆開，只留原本資料的部分，就是排序好的序列了。

.. code-block:: python

    sorted_data = [ student for grade, student in sorted(decorated_data, reverse=True)]

原理非常簡單，但實作起來非常麻煩。

所以在 Python 2.4 之後，引入了參數 key。與參數 cmp 相同，key 也可以接受一個函式當做參數。這個函式的功能是輸入一個元素，然後回傳這個元素的「代理」，比如說下面的例子：

.. code-block:: python

    sorted_data = sorted(data, reverse=True, key=lambda student: student.grade) #輸入 student 回傳 grade

原理和剛剛手動操作的方式相同，只是現在 Python 自動幫我們解決了。

順帶一提，Python 在 operator 這個模組提供了一些內建函式來協助我們定義 key 可以使用的自訂函式，舉例來說：

.. code-block:: python

    import operator

    # operator.attrgetter('grade') 等同於 lambda student: student.grade
    sorted(data, reverse=True, key= operator.attrgetter('grade')) 

除了 attrgetter 函式外，這個模組中還包含了許多東西，像是 itemgetter 函式，用途應該不難猜，所以我就不多提了。事實上，我並不推薦這種使用方式，因為這並不會減少程式碼多少，也不會增加什麼效能，何必付出額外的代價學習記憶呢？是故相對之言，我更加推薦簡潔通用的「lambda」。

參數 cmp v.s. 參數 key
------------------------

看到這裡，你可能已經發現這兩個參數的功能似乎有重疊之處，事實上也確實是如此。

不過若要直接比較使用那一個比較好，似乎也不太妥當，因為這兩者的工作並不相同，而且也不是互斥的。參數 cmp 是決定「元素之間比較的方式」，而參數 key 則是為每一個元素「找一個代理來比較」。回傳的代理也可再交由 cmp 函式來比較兩者的大小，兩者並沒有衝突的地方。

不過話說回來，因為參數 key 的功能確實幾乎能取代參數 cmp，而且一般來說使用參數 key 的效能會比較好，因為一個元素可能會呼叫很多次參數 cmp 的比較函式，但最多只會呼叫 key 的函式一次。另一方面，在 Python 3 以後，也取消 cmp 這個參數了。基於以上理由，雖然目前在 Python 2.x 中仍可以使用參數 cmp，但我認為還是盡可能改用參數 key 比較保險。

進一步討論
=======================

Python 排序用的演算法
------------------------

Python 使用一種叫 Timsort 的混種排序演算法，這是由 Tim Pepters 這位大神為 Python 設計的，在 Python 2.3 後成為了 Python 的標準演算法。

Timsort 融合合併排序 (Merge Sort) 和插入排序 (Insertion Sort) 兩種排序演算法。個數少用就是插入排序，個數多則用合併排序。差別是這個合併排序有點不一樣，裡面引用了一個簡單的概念增加排序的效果，其概念是「在現實情況中，大部分的序列裡面會藏有部分早就排序好的小片段，由於這些小片段不需要再花時間排序，所以抓出這些小片段就可以減少排序的時間」，我們也不需要知道這麼詳細，不過有一點一定要清楚，那即是這種排序法是一種「穩定」的排序法，也就是說這個演算法會保證維持相等值的相對次序，比如說：

.. code-block:: python

    >>> data = [Student('小雞', 90, '女生'), Student('小喵', 90, '女生')]
    >>> sorted(data, key=lambda student: student.grade)
    ['小雞', '小喵']

因為小雞和小喵的兩人的分數相同，所以如果一開始小雞在小喵之前，排序完小雞一定還會在小喵之前。

什麼可以排序？
------------------------

首先，自然要是序列才能排序，之前在「`淺談 Python 的 for 迴圈 </articles/淺談-python-的-for-迴圈/>`_」有提到，至少要支援 __iter__ 或 __getitem__ 這兩個函式才能當成序列，若要使用自訂的序列，必須要考慮到這一點。

另一方面，序列裡面的元素也有限制，不想用參數 cmp 的話，裡面元素就要能直接比較大小。

可是現在有一個小問題，那就是比較大小相關的函式有 __lt__ (小於) 、__gt__ (大於) 、__eq__ (等於) 、__ne__ (不等於) 、__le__ (小於或等於) 、__ge__ (大於或等於) 六種。如果只為了排序，就要另外定義這六個函式也是挺麻煩的，不是嗎？

幸好我們不用擔心這一點，因為 Python 保證了只要有定義 __lt__ 函式，那麼排序的時候就只會用 __lt__ 函式；而如果沒有定義 __lt__ 函式，至少也只會用 __gt__ 函式，換言之，實作 __lt__ 函式足矣。

話說回來，當碰到需要自行定義比較大小時，定義全部六個比較函式顯然還是比較推薦的做法。但正如前面所說的，我們其實不想單為了排序就要額外實作六個函式，所以 Python 2.7 以後提供了一個好用的解決方式，那就是使用 functools 模組的 total_ordering。

.. code-block:: python

    @total_ordering
    class Student:
       def __init__(self, name, grade, gender):
           self.name = name
           self.grade = grade
           self.gender = gender
       def __eq__(self, student):              # 僅需要實作兩個函式即可
           return self.grade == student.grade
       def __lt__(self, student):
           return self.grade < student.grade
       def __repr__(self):
           return self.name

具體的做法就是在自訂的類別上面加上 @total_ordering，接下來只需要實作兩個比較函式即可，其中一個限定是 __eq__ 函式，至於另外一個，則可以自由選擇 __lt__ 函式、__le__ 函式、__gt__ 函式或 __ge__ 函式實作。@total_ordering 就會自動幫我們補完剩下的函式。

.. note:: 雖然可以四選一，但我覺得實作 __lt__ 函式會是比較好的選擇。

特殊應用 – Natural Sort 的問題
---------------------------------

還有一個問題也常碰到，那就是 Natural Sort 的問題，舉例來說，假設有一些散落的書頁，而我想做排序：

.. code-block:: python
    
    >>> pages = ['p14', 'p3', 'p13', 'p2', 'p4', 'p12', 'p11', 'p1']
    >>> sorted(pages)
    ['p1', 'p11', 'p12', 'p13', 'p14', 'p2', 'p3', 'p4']

咦！為什麼 p11 會排在 p2 前面？這其中的奧妙自然是 Python 使用 ASII 的方式排序。

但重點是該怎麼解決這個問題呢？我沒有找到一個官方的解決辦法。但幸好 Python 擁有強大的第三方函式庫可以使用，所以我們可以選用 natsort 來解決這個問題，這個函式庫可以簡單的用 easy_install 或是 pip 下載。

直接舉個簡單的使用範例：

.. code-block:: python

    >>> from natsort import natsorted
    >>> natsorted(pages)
    ['p1', 'p2', 'p3', 'p4', 'p11', 'p12', 'p13', 'p14']

便可以輕鬆解決這個問題了。

總結
=============

學完了 Python 排序相關的使用方法後，也許你現在手癢癢想要試試各種操作 Python 排序的方式，不過小弟我在這裡要提醒一件事－－別走火入魔了，很多事情並不需要使用排序！
這裡做一個測試－－假設這裡有一個序列，目標是找出最大的元素，你心中第一個想到的是什麼呢？

|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|

如果是 sorted 的話，那麼恭喜你走火入魔了XD。
