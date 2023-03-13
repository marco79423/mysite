淺談 Python 的屬性
##########################

:date: 2014-6-12
:categories: 技術分享

.. note:: 這篇文章只討論新式類別(new-style class)的情況，理由是如果再加上舊式類別(old-style class) 的用法，問題會變得太過複雜，不利於理解……雖然現在這樣還是頗難懂就是了。

什麼是屬性(Attribute)？

Python 的屬性概念包含非常廣泛，基本上所有「.」之後的都是屬性。由於 Python 所有東西都是物件，所以取得某物件的屬性也可說是「從一個物件中取得附屬於該物件的另一個物件」。

.. code-block:: python

    chicken.weight  #weight 是 chicken 的屬性

Python 的屬性可以分為「實例屬性(instance attribute)」和「類別屬性(class attribute)」兩種。實例屬性又稱資料屬性(data attribute)，類似於 C++ 的成員變數(member variable)；至於類別屬性則類似於 C++ 的靜態成員變數(static member variable)。

所有的資料屬性都是伴隨著實例生成，因此每一個實例的資料屬性都是互相獨立的，當修改其中一實例的資料屬性時，並不會影響到其他實例。另一方面，類別屬性並不會隨著實例而生成，甚至不需要產生任何實例便可直接存取，每一個實例所存取的類別屬性都將是同一個，也就是說當我們修改類別屬性時，也會影響到別的實例存取。換個角度來看，由於 Python 所有東西都是物件，因此類別自然也可看作是一個物件，而類別屬性即是此物件的資料屬性，而因為類別只有一個，所以實例存取時都是存取同一個屬性。

.. code-block:: python

    >>> class Chicken(object):
            weight = 1.1 #類別屬性

            def __init__(self):
                self.age = 18 #實例屬性(or 資料屬性)

            def get_age(self):
                return self.age

    >>> c = Chicken()

    >>> c.age
    18

    >>> c.weight  #可以藉 c 直接存取類別屬性(與存取 Chicken.weight 相同)
    1.1

物件裡預設會有 __dict__ 這個特殊屬性，不需我們手動建立。 __dict__ 是一個字典物件(dict)，裡頭會自動存放著物件的所有自定義的屬性。事實上，這也是屬性實際存放的位置。我們可以直接透過 __dict__ 存取物件的屬性，在一些情形下，這是一個有用的技巧：

.. code-block:: python
    
    >>> c.__dict__ #__dict__ 是個字典物件
    {'age': 18}

    >>> c.__dict__['age'] #與存取 c.age 同義
    18    

    >>> c.abc = 3 #可以隨時定義新的屬性

    >>> c.__dict__
    {'age': 18, 'abc': 3}

你也許會好奇，此例既然可以用 c.weight 存取類別屬性，為何 __dict__ 並沒有 weight 屬性呢？那是因為無論 c.weight 還是 Chicken.weight 所指的屬性位置都是在 Chicken 的 __dict__ 中。

.. code-block:: python

    >>> Chicken.__dict__
    <dictproxy {'__doc__': None,
     '__init__': <function __main__.__init__>,
     '__module__': '__main__',
     'get_age': <function __main__.get_age>,
     'weight': 1.1}>   #<= 在這裡！

換句話說，Python 在搜尋物件的屬性時，並不只針對物件本身，還會搜尋其類別的屬性，實際搜尋的順序如下：

1. 物件本身的屬性
2. 其類別的屬性
3. 類別的父類別或祖先類別的屬性

(有例外，後面會說明)

我們可以簡單的證明這一點，假若 Chicken 類別再定義一個與類別屬性 weight 同名的實例屬性：

.. code-block:: python

    >>> class Chicken(object):
            weight = 1.1 #類別屬性

            def __init__(self):
                self.weight = 1.5 #實例屬性 
    >>> c = Chicken()

    >>> c.weight
    1.5             #證明實例屬性會優先於類別屬性

回頭看 Chicken 類別可以發現 get_age 這個函式也包含在 __dict__ 中了，這似乎代表 get_age 函式其實也是一個類別屬性。

但這個 get_age 似乎有點不一樣？再進一步觀察，可以發現由類別呼叫這個函式與由物件呼叫這個函式的結果似乎也不一樣。

.. code-block:: python

    >>> Chicken.__dict__['get_age']
    <function __main__.get_age>
    
    >>> c.get_age
    <bound method Chicken.get_age of <__main__.Chicken object at 0x02A192B0>>
    
    >>> Chicken.get_age
    <unbound method Chicken.get_age>

仔細想想，這並不奇怪，因為函式由類別呼叫或是由物件本身呼叫的行為本來就不同。

.. code-block:: python

    >>> c.get_age()
    18
    
    #如果不知道是那一個物件，就不知道 age 為何，因此必須加上指向物件的參數
    >>> Chicken.get_age(c) 
    18

這也很好的解釋了剛剛顯示的資訊，Chicken 的 get_age 是 unbound 的，因為沒有綁定在某一個物件上，所以必須加上指向物件的參數，而 c 則不需要。

不過這樣一來，卻產生了一個新的困惑，我們已經知道屬性實際是存放在 __dict__  中，但這個名為 get_age 的屬性卻同時有兩種不同行為！

為什麼呢？

事實上，這個名為 get_age 的神秘屬性有一個正式的名稱叫做「描述器(Descriptor)」，其功能就是產生給類別用的 unbound 函式和產生給物件用的 bound 函式。

描述器即是支援下列三個函式的物件：

::

    __get__(self, obj, type=None) --> value

    __set__(self, obj, value) --> None

    __delete__(self, obj) --> None

但並非三者都必須同時支援，描述器可再細分為「資料描述器(Data Descriptor)」和「非資料描述器(Non-Data Descriptor)」兩種，其中「非資料描述器」只需要支援 __get__ 即可，而前述的 get_age 便是一個「非資料描述器」。

Python 在存取物件的屬性時，若發現取出的物件是一個描述器時，接下來的動作無論是讀取或是修改都會交由描述器自己處理。比如說當發現 c.get_age 是一個描述器時，回傳的並不是描述器本身(也就是 get_age)，而是執行 get_age.__get__()，然後回傳該函式執行的結果。

.. code-block:: python

    >>> c.get_age
    <bound method Chicken.get_age of <__main__.Chicken object at 0x02A192B0>>
    
    >>> Chicken.__dict__['get_age'].__get__(c, Chicken) #與前者同義
    <bound method Chicken.get_age of <__main__.Chicken object at 0x02A192B0>>

    >>> c.get_age()
    18

    >>> Chicken.__dict__['get_age'].__get__(c, Chicken)()  #與前者同義
    18

__get__ 可以接受兩個參數，第一個參數代表對應的物件實例，第二個參數則是該物件對應的類別。為何要如此設計呢？因為每一個實例都可以擁有個別的屬性值，因此描述器回傳的屬性值必須要能根據不同的實例而有所不同。除此之外，除了實例可以呼叫屬性外，其類別也要能呼叫同樣的屬性(e.g. Chicken.get_age)，所以我們必須要能區分是實例呼叫的還是類別自己呼叫的。

基於以上理由，第一個參數存在的目的就是讓描述器能夠根據不同的物件實例回傳對應的屬性值。若由類別呼叫，因為沒有實例(第一個參數傳入 None)，因此必須要由第二個參數告訴描述器究竟是由那個類別呼叫。由此可知，因為這樣的設計，所有不同實例和類別的該屬性值都可以直接存放在唯一的那個描述器中，不需要存放在個別的物件實例中。

.. code-block:: python

    >>> get_age = Chicken.__dict__['get_age']

    >>> get_age.__get__(c, Chicken) #c.get_age 實際使用的函式

    >>> get_age.__get__(None, Chicken) #Chicken.get_age 實際使用的函式

既然提到了非資料描述器，免不了也要提一下資料描述器，資料描述器與非資料描述器差別在於多了 __set__ 或 __delete__。若定義了 __set__ 便可用 instance.attr=3 這種寫法修改屬性值；而定義了 __delete__ 則可以用 del instance.attr 刪除屬性。

為什麼我要強調非資料描述器和資料描述器的不同呢？不是只差別在可否修改而已嗎？那是因為兩者在 Python 中有完全不同的優先權。Python 在尋找某物件的屬性時，好比說要尋找 c.attr ，是根據以下順序尋找的：

1.  尋找其類別的 __dict__ 有沒有 attr，若有而且 attr 是資料描述器就直接回傳 __get__ 的結果
2.  尋找 c 自己的 __dict__ 有沒有 attr，若有便直接回傳
3.  若剛剛類別的 __dict__ 其實有 attr，但 attr 卻是非資料描述器時，現在便回傳其 __get__ 結果

簡單來說，就是先看有沒有資料描述器，然後再找實例自己，若自己沒有就再找非資料描述器。你也許會很驚訝，有沒有定義 __set__ 或 __delete__ 竟有這麼大的差別？

話又說回來，Python 大費周章的定義了「描述器」這個概念，描述器又能用來做什麼呢？在操作描述器這種屬性時，我們可以用函式來定義 c.attr、c.attr=3 和 del c.attr 的行為。

這提供了我們很大的彈性來操作屬性，我們可以在看似單純的給某物件的變數賦值時做處理，比如說檢查賦值時型態的正確性或是在賦值前修改值的內容；在存取時，也可以是動態的計算屬性值的最新狀態；若需要很多資源，還能用快取的方式記錄屬性增加存取的速度。而且因為描述器的特性，描述器能夠查覺究竟是被物件呼叫還是類別呼叫，我們也可以強迫某屬性只能由物件或類別來呼叫。

不過若是每一個需要使用描述器的屬性都要各自實作一個類別顯然不夠方便，反正關鍵在於我們希望能自行定義屬性在存取、賦值和刪除時的行為，所以 Python 另外提供了一個方便的做法，那就是使用 property。

.. code-block:: python

    property(fget=None, fset=None, fdel=None, doc=None) -> property attribute

舉個例子，假設我想在 Chicken 這個類別定義 weight 這個屬性，存取、賦值和刪除的行為都要能自己定義，我可以這麼做：

.. code-block:: python

    class Chicken(object):

        def get_weight(self): 
            return "非常重！"

        def set_weight(self, weight): 
            raise Exception("不給改~~")

        def del_weight(self):
            raise Exception("而且不給刪~")

        weight = property(get_weight, set_weight, del_weight, "這是一個邪惡的屬性")

另一種更簡單的寫法：

.. code-block:: python

    class Chicken(object):

        @property
        def weight(self):
            return "非常重"

        @weight.setter
        def weight(self, weight):
            raise Exception("不給改~~")

        @weight.deleter
        def weight(self):
            raise Exception("而且不給刪~")
     
這整個流程包括前述的讀取順序都是在 __getattribute__ 這個函式實現的，我們也可以覆寫這個函式，取代原本的功能。

.. code-block:: python

    class Chicken(object):

        @property
        def weight(self):
            return "非常重"

        def __getattribute__(self, attrname):
            """
            覆寫 __getattribute__，改變原本的行為
            """
            if attrname == "weight":
                return "其實沒很重"
            return super(Chicken, self).__getattribute__(attrname)

如此一來，當存取 c.weight 屬性時，回傳的就不會是「非常重」而是「其實沒很重」了。另外，由於這個函式是最先被呼叫的，因此這個函式可說是存取屬性時的第一道門，我們可以用這個函式直接改變 Python 原本存取屬性時的行為，比如說修改存取屬性的順序或使用快取。

.. code-block:: python

    def __getattribute__(self, attrname):
        if attrname in cache: #使用快取
            return cache[attrname]
        return super(Chicken, self).__getattribute__(attrname)

但因為每一個屬性都會呼叫 __getattribute__，甚至包括 __XXX__ 這種特別的屬性，所以使用時一定要非常小心。

.. note::

    要注意 __getattribute__ 是 new-style class 才能使用的功能。

另外，對應讀取屬性的行為，自然也會有修改和刪除，這兩個函式分別為 __setattr__()、__delattr__()。

::

    __setattr__(self, attrname, value)  --> None

    __delattr__(self, attrname)  --> None

這兩者使用的感覺和前者相近，就不復述了，但記得使用 __getattribute__ 和 __setattr__ 這類的函式時一定要小心無限迴圈的問題，比如說千萬不能這麼做：

.. code-block:: python

    def __getattribute__(self, attrname):
        if attrname == "weight":
            return self.weight  #千萬別這麼做！
        return super(Chicken, self).__getattribute__(attrname)    

理由是 self.weight 會再呼叫一次 __getattribute__，然後裡頭的 self.weight 又會再呼叫一次 __getattribute__，如此不斷地進行下去，直到程式死給你看。

事實上，這幾個函式在沒有必要時，個人不推薦使用，因為通常我們不會隨便「同時修改所有存取屬性的行為」，若是個別的修改，也可以使用描述器。如果是要用來處理不存在的屬性時，也有 __getattr__ 可以使用。

__getattr__ 看起來與 __getattribute__ 非常相似，很容易搞混，而且用法也幾乎一模一樣，差別在於 __getattr__ 只會在找不到屬性時才會被呼叫。所以說我們可以用這個函式來專門處理「不存在的屬性」，比如說：

.. code-block:: python

    >>> class Chicken(object):

            @property
            def weight(self):
                return "非常重"

            def __getattr__(self, attrname):
                return "哭哭，您呼叫的屬性不存在！"

    >>> c = Chicken()
    >>> print c.fadfadfafa  #會印出「哭哭，您呼叫的屬性不存在！」

最後總結一下 Python 整個搜尋屬性的過程：

1. 有定義 __getattribute__()，便回傳執行結果。若擲出 AttributeError 異常，則仍會繼續下一步。
2. 搜尋是否有資料描述器，若有則回傳其 __get__() 的結果
3. 搜尋 __dict__ 中是否有相符的屬性名稱，若有則回傳
4. 搜尋是否有非資料描述器，若有則回傳其 __get__() 的結果
5. 若有定義 __getattr__()，則回傳執行結果。但如果擲出 AttributeError 異常，則會繼續下一步。
6. 若實在找不到，便擲出 AttributeError 異常

這篇文章大概整理了一下 Python 屬性的使用，要記得這裡提到的用法都是單指新式類別的情況，因為舊式類別的運作有些許的不同，好比說 __getattribute__ 就只能在新式類別才能使用，所以使用時一定要注意這一點。