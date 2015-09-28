##################################################
UNIX 常用指令 - find
##################################################

:date: 2013-07-21

.. rubric:: 這裡討論的內容以 FreeBSD 為主，可能會與 linux 系的不同。

在 FreeBSD 中，如果我們想要找尋某一個檔案的話，就可以用「find」這個指令快速找到想要的檔案，
比如說現在要找尋一個檔名為「chicken.py」的檔案，但不知道在那兒，那麼我們就可以利用這個指令搜尋。
當然了，如果 find 只有這點實力的話，那就可以很輕鬆的用別的指令來取代它，並不值得一提了。

主要的問題在於通常我們會找不到檔案，常常是因為我們忘記檔案確切的名稱，甚至是本來就不知道名字，連檔案是否確實存在都不敢肯定，
碰到這種情況，用常規的辦法就比較難找了。

舉一個例子，假設現在我想知道 chicken(某位使用者)有沒有藏「秘密日記」在檔案系統中，但因為我根本就不知道這個檔案確實的名稱，
甚至連存不存在都不知道，所以只能用一些蛛絲馬跡來猜測，這時使用 find 指令就是非常好的辦法。

那麼如何使用 find 指令呢？大致的格式如下：

>>> find 要想找尋的位置 條件

使用的方法相當的直覺，主要有兩個部分，首先是「想要找的位置」，顧名思義，即是指檔案可能存在的位置，
好比說我覺得 chicken 的「秘密日記」比較可能放在她的家目錄，那我就可以指定 chicken 的家目錄當成我要找尋的位置，
然後 find 就會查找這個目錄裡面所有的檔案和目錄；至於「條件」則是指篩選的條件，chicken 的家目錄這麼多檔案，
我可以利用一些「條件」篩去不要的檔案，
比如說此例我就可以設一個條件指定日記可能的檔名，把不符合檔名的檔案篩掉。

首先，由於日記的英文是「diary」，所以想要找 chicken 的日記的話，可以先試試看「diary」這個檔名，所以我下這樣的指令：

>>> find /home/chicken -name diary

「-name」即是檔案名稱的意思，這行指令的意思是我想找檔名為「diary」的檔案，如果找到了，就列出來，
如果沒找到，就什麼都不列。

::

    >>> find /home/chicken -name diary
    /home/chicken/.private/diary  #成功的假想

不過想當然爾，女生的日記不是這麼容易找尋的，所以並沒有找到。
主要問題在於檔名剛好就是「diary」的可能性太低，因為她可能會取「chicken-diary」、「mydiary」之類的名稱，
那麼用這種方法就找不到了。

不過話說回來，反正不管什麼組合，至少我推測她應該會使用「diary」這個關鍵字，所以我可以這樣下：

>>> find /home/chicken -name '*diary*'

沒錯，find 可以支援使用像是「?」、「*」這類的符號做不精確的搜尋，「*」代表這個位置可能會有零個、一個或是多個字元，
具體的是什麼我不知道，因此「\*diary\*」的意思就是在「diary」前後都可能有未知的字串，像是「diary」、「chicken-diary」、
「mydiary」和「diary-chicken」都算符合條件。至於之所以外面要用引號包起來是為了怕 Shell 誤判「*」的意思，
如果不想用的話，也可以在「*」前面加上反斜線「\\」代替。

*「嗯？似乎還是找不到？」*

*「對喔~她也有可能用中文名稱呀？像是「日記」、「我的日記」之類的？」*

沒錯，她使用的關鍵字，除了「diary」外，也有可能是「日記」呀！也就是說我的條件並不只一個！
那怎麼辦呢？沒關係！事實上 find 也支援複雜的條件，可以使用「AND」、「OR」和「NOT」三種邏輯，邏輯「AND」用「-a」表示、
邏輯「OR」則用「-o」表示，而邏輯「NOT」則是「!」，因此我可以這麼下：

>>> find /home/chicken -name '*diary*' -o -name '*日記*'

這個指令的意思是找出檔名中包含「diary」或「日記」關鍵字的檔案。

話說回來，如果女生的日記這麼好找的話，女生就不是女生了，所以果然找不到！
問題在那裡呢？對呀！誰說日記就只能放在家目錄呢？所以應該這麼下：

>>> find / -name '*diary*' -o -name '*日記*'

於是就出現了：

::

    /.private/marco-diary

咦！如果我這麼下的話，不是整個系統的使用者的日記都有可能被我找出來嗎？
所以似乎應該先鎖定一下檔案的所有者才對！幸好 find 也可以輕鬆的做到這一點，我們可以用「-user」代表限定使用者的名稱、
用「-group」代表限定群組，而比較進階的，也可以使用「-uid」、「-gid」限定使用者的 UID 和 GID。
不過在這裡我應該可以假定，這個日記的所有者應該是「chicken」才是，因此我可以這樣下：

>>> find . \( -name '*diary*' -o -name '*日記*' \) -a -user chicken  

.. note:: -a 可以省略，因為邏輯「AND」是預設值。

這裡可以注意到，我有加上括號代表裡面的內容先判斷，表示先判斷檔名是否包含「diary」或「日記」，
符合條件後，再判斷所有者是不是「chicken」。另外要注意的是前面要加上反斜線「\\」，這一樣是為了避免 Shell 誤判。

.. note:: 刪除使用者時，使用「-user」很方便。

於是就出現了：

::

    >>> find . \( -name '*diary*' -o -name '*日記*' \) -a -user chicken
    /home/chicken/.abc/nbrjnoql.default/data/linux64/components/TCPSocketParentIntermediary.js
    /home/chicken/cssulabug-diary/ngsagfafiex.cfaf
    /tmp/Radfareadfdrsdiaryafafd
    ....(數千行

不行！還是有一堆無關緊要的檔案！我想是因為「diary」這個詞太常見了，所以果然還是必須多加一些條件才行.....對了！
她平常都是晚上使用電腦的，所以如果她有寫日記的話，多半也是晚上寫才是，如果我多加一個條件，限制檔案修改的時間為晚上的話，
是不是就可以去掉像是 log 之類的檔案呢？好加在 find 太強大了，也可以做到這一點。
比如說我們可以設定「找出所有修改時間為十分鐘前的檔案」或是「找出一天內被存取過的檔案」這種條件。
具體的做法「-atime」代表存取的時間，而「-mtime」則代表修改的時間，時間單位為天，如果不想以天為單位的話，
也可以改用以分鐘為單位的另外兩個參數「-amin」和「-amin」。

比如說剛剛 chicken 在半個小時前，有用過十分鐘電腦，那我可以這樣下指令，找出她這段時間有存取的檔案：

>>> find /home/chicken -amin +20 -amin -30

加號「+」代表超過，而減號「-」則表示少於，此例的意思是找出所有「/home/chicken」最近二十分鐘到三十分鐘之間有被存取的檔案。

.. note:: 這裡要注意的是「+1」不代表一分鐘，而是超過一分鐘，也就是二分鐘以上。

加上時間條件，想必就可以找到 chicken 的日記了......咦！？

::

    >>> find /home/chicken -amin +20 -amin -30
    /home/chicken/diary/0
    /home/chicken/diary/1
    /home/chicken/diary/2
    /home/chicken/diary/3
    /home/chicken/diary/4
    ...
    /home/chicken/diary/diary/1
    /home/chicken/diary/diary/2
    ...(數千行

竟然是傳說中的烏賊戰術！利用大量的無用檔案掩蓋真正的有用的資料，以避免像是本作者這種混蛋偷看她的日記！
這果然是個好辦法，不過這還是難不倒我，可以注意到她其實是故意將某一目錄取名為「diary」，
然後在這個目錄中建立大量無用的檔案掩蓋。
雖然是好方法，但我還是可以利用 find 的「-type」參數限制檔案的類型，最常用的類型有兩個，分別是一般檔案「f」和資料夾「d」，
因此這裡我可以這麼做：

>>> find /home/chicken \( -name '*diary*' -o -name '*日記*' \) -a -type f 

*(這裡為了避免太複雜，所以我省略了時間的條件)*

這樣代表符合的檔案類型必須是一般檔案，而不是目錄。

於是......

::

    >>> find /home/chicken \( -name '*diary*' -o -name '*日記*' \) -a -type f
    /home/chicken/haha/diary1
    /home/chicken/haha/diary2
    /home/chicken/haha/diary3
    /home/chicken/haha/diary4
    ...
    /home/chicken/haha/stupid-marco/diary1
    /home/chicken/haha/stupid-marco/diary2
    /home/chicken/haha/stupid-marco/diary3
    ...(還是數千行

這.....好！沒關係，我還有一招！反正這些「烏賊檔」多半是用指令「touch」生的，所以檔案大小都是 0KB，但如果是真的日記的話，檔案大小自然就不可能是 0KB！
所以我可以使用「-size」來解決這個問題，「-size」可以指定限制的檔案大小，而且可以支援多種單位，比如說「c」代表「bytes」，而「k」代表「KB」。

====== ========== 
 符號   大小單位
====== ========== 
 c      bytes
 k      KB
 M      MB
 G      GB
====== ========== 

在這個例子我可以這麼做：

>>> find /home/chicken \( -name '*diary*' -o -name '*日記*' \) -a -type f -a -size +1k

這行指令的意思是符合的檔案必須大於 1 KB，小於等於的不算，另外也可以看出來這裡也可以使用和限制時間相同方式使用「+」或「-」。
透過這個手段，想必就可以找出我要的日記了！

::

    >>> find /home/chicken \( -name '*diary*' -o -name '*日記*' \) -a -type f -a -size +1k
    /home/chicken/stupid/stupid/diary-big
    /home/chicken/stupid/stupid/diary-big2
    /home/chicken/stupid/stupid/diary-big3
    /home/chicken/stupid/stupid/diary-big5
    ...(還是數千行

天啊！這女人實在是太可怕了！竟然這樣也有防備！太可惡了！受不了！怎麼這麼難找呢？

......好吧！

>>> sudo touch /home/chicken/.diary #幫她生一個日記

於是如果以後我想要找到 chicken 的日記，我就可以看到：

::

    >>> find /home/chicken -name '.diary'
    /home/chicken/.diary 

*「耶！終於找到了！(有種莫名感傷的意味)」*

*「不過話說回來，找到她的秘密日記後，又該如何做呢？」*

那還用說？身為一個專業的壞人，找到以後自然應該這麼做：

>>> find /home/chicken -name '.diary' -exec ln '{}' '/home/marco/chicken-diary' \;

find 除了能夠找尋我要的檔案外，也可以在找到檔案後，對每個檔案執行某一個指令，方法是使用參數「-exec」或「-ok」，
兩個參數的差別只在「-ok」每對一個檔案執行一次指令，都會詢問一次，比如說刪除的時候，就可以使用「-ok」，
避免誤刪。

「{}」代表抓到的檔名，習慣上還會外面加上引號，以免出現檔名包含空白之類的問題。
而指令後面的分號「;」則是使用「-exec」的要求，後面一定要加上這個，才代表指令結束。
所以上例的意思就是「找到 chicken 的日記後，建一個 link 到 marco 的家目錄，連結檔的檔名為「chicken-diary」。
這樣一來，我就可以時不時的偷看到她寫的日記，然後檢查平常有沒有說我的壞話了。

看到這裡，除了找到了 chicken 的日記外，相信大家也對好用的指令「find」有一定的了解，希望能對讀者有所幫助。

*「笨蛋！chicken 又不寫日記，最好是找得到啦~」*

