##################################################
UNIX 常用指令 - sort
##################################################

:date: 2013-03-12
:categories: 技術分享

.. rubric:: 這裡討論的內容以 FreeBSD 為主，可能會與 linux 系的不同。

sort 的功能就是將檔案的內容以行為單位做排序，非常實用，一定要會用。

假設有一個檔案名稱叫做 danger-level，內容為

::

    marco   2
    kevin   10
    chicken 100

代表各個使用者的危險層級，接下來我們會用這個例子來說明 sort 的用法。

>>> sort danger-level

上面指令的意義就是為 danger-level 這個檔案中每一行做排序，因此結果會是：

::

    chicken 100
    kevin   10
    marco   2

但通常每一行都會有很多欄位，比如說此例我們可能會想要以危險層級來排序，我們可以使用參數 -k，如：

>>> sort -k 2 danger-level

就是表示 danger-level 從第兩個欄位(也就是數字部分)開始比較，結果如下： 

::

    kevin   10
    chicken 100
    marco   2

更詳細的用法，參數 -k 其實可以填第兩個位置，如「-k 2,2」，表示比較到這個欄位的意思，平常可以省略，
預設是最後一個欄位.....等一下！為什麼結果 100 會在 2 之前？難道是因為 marco 比 chicken 為危險？

當然不是這樣的！因為 sort 使用的是字典排序，而「1」在「2」之前，所以會有這樣的結果，
如果想要 sort 以數值的方式來排序的話，就要加上參數 -n，如：

>>> sort -k 2 -n danger-level

就會以危險數值由小排到大做排序：

::

    marco   2
    kevin   10
    chicken 100

但有些時候，檔案的欄位並不是以空白或 tab 分割，比如說 /etc/passwd 是以「:」來分隔，
這時我們就要自行指定分隔的符號是什麼，不然 sort 並不會知道到底要以什麼符號分隔。
我們可以用參數 -t 指定要分隔的字元是什麼，來達成這個目的。

>>> sort -t: -k1 /etc/passwd

除此之外，還有一個常用的參數是 -r，和許多常用的指令相同，即是反向排序。

最後再補充兩個簡單而且常用的案例，第一個案例是將資料夾的檔案根據檔案大小做降序排列：

>>> ls -al | sort -k 5 -r -n

第二個案例則是將 /etc/passwd 的內容依名稱排序，並去掉開頭是「#」的行，可以這麼做：

>>> sort -t: -k1,1 /etc/passwd | grep -v ^#
