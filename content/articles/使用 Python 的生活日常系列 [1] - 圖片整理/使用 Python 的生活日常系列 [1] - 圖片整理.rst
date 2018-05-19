使用 Python 的生活日常系列 [1] - 圖片整理
###########################################

:date: 2015-2-14
:categories: Python;程式設計
:series: 使用 Python 的生活日常系列

前言
========================

不知道你有沒有覺得花了很多時間在學寫程式，卻不知道能用來做什麼的感覺？

據我所知，許多國高中甚至已經將寫程式帶入課程之中了。但學了半天，又有多少人會去實際使用呢？感覺就像學了另一門用不著的外語一樣。以為寫程式只是用於作業而已。

即使是本科生，也有很多人覺得那不過是畢業後在職場上寫那些無聊的大程式用的。好玩的程式？厲害的程式？那是只有智商不屬於人類範疇的生物才寫的出來的東西，既然自己只是普通人，又何必強求？

「我太弱了，只會寫 Hello World，那種很厲害的東西寫不出來啦！」

有些人甚至認為－－那些 ACM 高手就是程式人的範本，以為不斷地敲腦袋，想出「嚇死人不償命」的演算法，就是寫程式的一切。

想太多！

程式是為了方便人們生活的工具，學寫程式是讓我們自己有能力自己方便自己的生活。

請問我們日常生活中，有一直在做什麼驚天動地、嚇死人不償命的事嗎？隨手投資千億股票、隨口一句千萬人頭落地？至少我沒有，我只是個普通人，所以自然不需要嚇死人的程式能力才能使我的生活更方便。

讓寫程式融入日常生活中
========================

何謂日常生活？

日常生活就是一堆無聊瑣事的集合，沒有什麼難度，但是很麻煩，很無聊，而且很花時間。好比說老闆隨口一句：「嗯，那就把投影片的別人公司的 logo 去掉，換成自己的吧。你『順便』做一下」。

所以當老闆回辦公室泡茶後，你就得花了數個小時，一張張修改、重拉投影片。這時隔壁的同學就會適時的出現，拍拍你的肩說：「兄弟，這就是『生活』呀。」

談功課太殘忍，先來談談休閒生活。

但自己的休閒生活很多時候也沒多有趣，今天要來討論的是很多人生活中常會出現的畫面：

「我該死的照了一堆照片，然後我該死的想整理它，但看了那個該死的數量後，我該死的放棄了」

所以就來到今天的主題－－

如何用 Python 整理照片？
==========================

不同的人有不同的整理方式，但在整理前，大家的照片都一樣是混亂的(廢話，不然何必整理？)

但話說回來，既然有不同的整理方式，那麼大家的「亂」法也應該不同吧？我簡單舉幾個可能性：

* 不同的工具，好比說 iPhone 或 HTC New ONE，照出來的照片會有不同的命名方式，所以檔名混亂。
* 先前傻傻的不知道，用 1, 2, 3, ... 10 而不是用 01, 02, 03, ... 10 的方式命名，所以瀏覽軟體顯示的圖片順序是錯誤的(照片或許沒差，但漫畫圖片就是地獄了)

該怎麼辦呢？

隨便打開一個文字編輯器，新增一個空白檔案，開始寫程式吧！

先從簡單的問題開始，假設現在有一個資料夾，裡面有一堆照片，但因為這些照片的來源不只一個，有些是自己手機照的、有些媽媽手機照的、又有些是由 facebook 抓來的。不用的工具擁有不同的命名方式，雖然通常都是以時間來命名，但格式不同，所以現在檔名混亂。現在想要幫這些檔案重新以一致的格式命名，我該怎麼做呢？

簡單看了一下需求，大概可以條列幾個步驟：

1. 列出有那些檔案
2. 分析這些檔案
3. 然後用統一的規則為這些檔案改名

Python 有一個 os 模組，這個模組提供了作業系統相關的功能，因為檔案的操作也包含在其中，所以我們可以由使用這個模組開始

.. code-block:: python

    import os

    #listdir 會列出目標資料夾的所有檔案名稱
    filenames = os.listdir("目標資料夾路徑") 

短短一行，我們便取得了所有檔案名稱。這裡面還有一些議題可以討論，假設一開始不知道確切路徑為何，我們可能會用到 os.path 模組相關的功能。像是用 os.path.expanduser 可以將「~」代換成家目錄實際的路徑，比如說：

.. code-block:: python

    >>> os.path.expanduser("~/Dropbox/pictures")
    /home/marco/Dropbox/pictures

不過程式是為了方便使用，我覺得最簡單的使用方式就是直接將程式移到要目標資料夾中，直接點兩下執行，該資料夾的照片名稱就會被重新整理。我覺得這樣的流程是最簡單易懂的，所以直接檢查當前目錄就行了。

.. code-block:: python

    #取得當前目錄的所有檔案名稱(注意：結果會包含程式本身)
    filenames = os.listdir(".") 

不過這裡面有很多檔案不是我要的，我只想要圖片而已，所以接下來我必須先篩選出那些才是我要的檔案。由於這篇文章的目的是希望藉一個例子來學習 Python 的各種常見的用法。反正時間不急，我們可以慢慢討論各種可能的用法，如果讀者可以想到更多好用的方法，歡迎在留言指出。

要知道一個檔案是否為圖片檔，最簡單的方法就是直接看檔名末尾的副檔案，假設圖片檔就只有 .jpg 和 .png 兩種格式，那麼我們就可以假定檔名會是以 .jpg 或 .png 為結尾的字串，那麼我們可以這麼做：

.. code-block:: python

    #判斷檔案是否為圖片
    def is_imag(filename):
        return filename[-4:] in ['.png', '.jpg']

    #取得所有圖片的檔名
    images = filter(is_imag, filenames)

filter 是 Python 中非常實用的函式，功能是篩選序列中所有 item，它可以接受兩個參數，前者是條件函式，後者是目標序列。目標序列中所有 item 都會丟進條件函式來判斷是否保留，如果回傳 True，這個 item 就會在回傳的新序列中，反之則否。

在這個例子中， is_imag 函式是我們用來判斷 filename 是否要保留的條件，如果為 True，那麼這個 filename 就會在 images 這個新序列之中。而我們判斷一個檔案的是否為圖片的依據是「檢查字串後四碼是否為 .jpg 或 .png ？如果是的話，我就當你是圖片！」。

但話又說回來，沒人規定圖片的副檔名只能是三個字，比如說 .jpeg 或 .tiff 即是四個字，所以這種寫法並不是太好。如果碰到副檔名長度不同時，就必須一個個比較了。但這麼一來比較時，還得一一列出副檔案的長度，像是 filename[-5:] 或 filename[-4:]，顯然不是好的做法。

或許我們可以改用字串的 endswith 函式來試試看。

.. code-block:: python

    #判斷檔案是否為圖片
    def is_imag(filename):
        return filename.endswith(".png") or filename.endswith(".jpg")

    #取得所有圖片的檔名
    images = filter(is_imag, filenames)

字串的 endswith 函式可以檢查字串的尾端，如果字串是以輸入的參數結尾，就會回傳 True，反之則為 False。

但這種做法如果副檔名的種類一多，程式碼就會顯得很冗长，這時我們可以用迴圈重構之。

.. code-block:: python

    #判斷檔案是否為圖片
    def is_imag(filename):
        for ext in [".png", ".jpg"]:
            if filename.endswith(ext):
                return True
        return False

    #取得所有圖片的檔名
    images = filter(is_imag, filenames)

看到這個迴圈，熟悉 map 和 any 的人可能就會有感覺，因為這可以改成更精簡的版本：

.. code-block:: python

    #判斷檔案是否為圖片
    def is_imag(filename):
        return any(map(filename.endswith, [".png", ".jpg"]))

    #取得所有圖片的檔名
    images = filter(is_imag, filenames)

map 可以接兩個參數，前者是函式，後者是目標序列。map 會將序列的每一個 item 丟給函式，然後將所有的函式回傳值當成新的序列，舉例如下：

.. code-block:: python

   >>> map(math.sqrt, [4, 9, 16])
   [2.0, 3.0, 4.0]

any 會判斷序列中的 item 有沒有存在 True，若有，就會回傳 True，若否則回傳 False。

.. note::  類似的函式有 all 函式，與 any 的區別是「序列中的 item 全部都是 True，才會回傳 True」

也許你會好奇，自己分析字串來找副檔名這麼麻煩，難道函式庫中沒有就可以專門抓出副檔名的函式嗎？

其實還真的有，在 os.path 中有一個叫 splitext 的函式可以將檔案的副檔名抓出來，舉個例子：

.. code-block:: python

   >>> os.path.splitext("a.png")
   ('a', '.png')

因此我們也可以改為：

.. code-block:: python

    #判斷檔案是否為圖片
    def is_imag(filename):
        return os.path.splitext(filename)[-1] in [".png", ".jpg"]

    #取得所有圖片的檔名
    images = filter(is_imag, filenames)

知道了所有圖片的檔名後，下一步就是分析這些檔案。假設我們的目的是統一用「1992-02-24.1.jpg」這種以「年-月-日.流水號.檔案格式」的格式重新為這些檔案命名，那麼我們在分析檔案時，就要先取得時間的資訊。

假設有一個檔案名稱為「2014-10-04 12.49.44.jpg」，我們可以便可以輕易地從檔名取得時間資訊，要怎麼分析呢？最直覺的做法自然是使用正規表達式：

.. code-block:: python

    from datetime import datetime

    #取得圖片建立時間
    def get_time(filename):

        #針對 Dropbox 的 Camera Uploads
        pattern = r'\d{4}-\d{2}-\d{2} \d{2}\.\d{2}\.\d{2}'
        match_object = re.match(pattern, filename)
        if match_object:
            timestring = match_object.group(0)
            return datetime.strptime(timestring, '%Y-%m-%d %H.%M.%S') 

        #針對其他的命名格式 
        #...

這種方式的概念是將符合目標格式的檔案抓出來，然後丟給 datetime 的 datetime.strptime 函式處理，這個函式能依據給予的格式將目標字串轉換成時間的型態。格式的指定的方式可以參考 `官方的文件 <https://docs.python.org/2/library/datetime.html#strftime-strptime-behavior>`_ 的內容。與之對應的還有 strftime，這個函式可以反過來將時間轉為指定格式的字串。

我們其實也可以直接全由正規表達式來判斷時間，不經由 datetime.strptime 函式處理。

.. code-block:: python

    from datetime import datetime

    #取得圖片建立時間
    def get_time(filename):

        #針對 Dropbox 的 Camera Uploads
        pattern = r'(\d{4})-(\d{2})-(\d{2}) (\d{2})\.(\d{2})\.(\d{2})'
        match_object = re.match(pattern, filename)
        if match_object:
            year, month, day, hour, minute, second = map(int, match_object.groups())
            return datetime(year, month, day, hour, minute, second)

        #針對其他的命名格式 
        #...

不過，有些檔案的名稱並沒有提供時間的資訊，比如說「IMG_0995_JPG」就看不出時間為何？

(也許能？但我不清楚規則，所以一樣沒辦法。)

山不轉路轉，其實我們可以直接利用檔案建立的時間當作標準。

.. code-block:: python

    #取得圖片建立時間
    def get_time(filename):
        timestamp = os.path.getmtime(filename)
        return datetime.fromtimestamp(timestamp)
    
    #或是
    def get_time(filename):
        timestamp = os.stat(filename).st_mtime
        return datetime.fromtimestamp(timestamp)
    
知道所有圖片建立的時間後，最後就是將這些圖片的名稱改為指定的格式，可能的做法有兩個，分別為 shutil.move 和 os.rename，這裡我採用 shutil.move 來進行改名：

.. code-block:: python

    #將檔案依時間排序
    filenames.sort(key=get_time)

    last_modified = None
    for filename in filenames:
        modified = get_time(filename)
        
        #決定流水號，若修改的日期與前一個檔案相同時流水號加 1
        if last_modified and last_modified.date() == modified.date():
            num += 1
        else:
            num = 1

        #依據時間和流水號決定檔案
        targetname = "{}.{}.jpg".format(modified.strftime("%Y-%m-%d"), num)
        
        #改名
        shutil.move(filename, targetname)

        last_modified = modified

排序的相關操作可以參考我之前寫的 `淺談 Python 的排序 </articles/淺談-python-的排序/>`_。至於之後的操作即是一些單純的程式邏輯，讓檔案依時間排序，比較前一個檔案的時間是否相同，若相同則流水號加 1 等，一個簡單的小程式就這麼寫完了。

別看這篇文章似乎頗長，看起來很複雜，那是因為我們有討論多種可能性而已，事實上這個程式不到五十行就寫完了，沒有什麼思考上的難題，也不需要太過高深的程式技巧，差別只是你原先可能不知道 Python 原來還有這麼多方便的工具可以使用而已。

以上。