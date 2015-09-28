為什麼 Qt 要有 Signals/Slots ？
####################################

:date: 2013-07-04

Signals/Slots 可說是 Qt 程式設計的基石，也是它最大的特色。尤其是在 GUI 程式設計時，
對比其他使用回呼函式的設計手段，就可以體會其巨大的好處，而 Qt 強大的 GUI 函式庫，也是根據這個機制打造，
可說是 Qt 的根本。

說了這麼多，到底 Signals/Slots 是什麼呢？這就要從一個故事說起了......。

很久很久以前，有一隻小雞名叫「顯顯」，而有另一隻小雞名叫「處處」，顯顯負責在螢幕上顯示一個上面寫著「發射」的按鈕，
而處處則負責將核彈發射至指定地點。

.. site-image:: 1.png
    :source: 為什麼 Qt 要有 Signals 和 Slots？
    :alt: 1.png

一旦有人按下顯顯負責的按鈕，顯顯就會將這個訊息告訴處處。

.. site-image:: 2.png
    :source: 為什麼 Qt 要有 Signals 和 Slots？
    :alt: 2.png

而處處接到這個訊號時，就會開始處理發射核彈的工作。

欣賞立法院火紅末日之餘，我們來研究一下這個「核彈發射程式」的運作。可以看出來，
這裡我們想要把程式區分成「顯示單元」和「運算單元」，「顯示單元」就是顯顯，
而「運算單元」則是處處。

之所以要區分「顯示單元」和「運算單元」是因為這兩者都是屬於常常變動，而且又是互相獨立的關係。
比如說那一天顯顯被一隻蟲吃掉了，可以很輕易的用「顯顯二號」代換，反正對處處而言，
顯示的方式並不重要，是紅色的按鈕還是綠色的按鈕並沒有差別；套用在顯顯身上也一樣，
對顯顯來說，只要能發射核彈，是不是處處做的根本無關緊要，反正該死的立法院一樣有火紅末日......。

以物件導向的想法來說，設計顯顯的時候，我們可能會覺得「按鈕」這種元件很有重用的價值，很多地方都會用到，
而且功能都是「按下去後，會做一件事」，因此我們可以設計一個通用的按鈕，這樣就不用為每一個按鈕都重新設計一個類別：

.. code-block:: c++

    class AbstractProcessor
    {
    public:

        virtual void process() = 0;
    };

    /*
     * 我是很通用的小雞顯顯
     */

    class Button
    {
    public:

        void setProcessor(AbstractProcessor *processor)
        {
            _processor = processor;
        }

        void clicked()
        {
            if(_processor) 
                _processor->process();
        }
    
        ...

    private:

        AbstractProcessor *_processor;
    };

之後我們再設計處處的時候，就可以像這樣設計：

.. code-block:: c++

    /*
     * 小雞處處
     */
    class Processor: public AbstractProcessor
    {
        void process()
        {
            //處理核彈發射
        }
    }

之所以要設計 AbstractProcessor 這個類別是因為我不想要讓顯顯和處處綁死在一起，
我可以輕鬆的把處處代換成做麵包的處處二號，只要處處二號也是繼承自 AbstractProcessor 即可。
完全不用改顯顯這個按鈕的程式碼。

.. code-block:: c++

    Button button1;
    button.setProcessor(new Processor());

    Button button2;
    button.setProcessor(new Processor2());

因此顯顯相當通用，符合物件導向的期望。不過這個做法有一個小小的問題，
那就是由於實際上我們並不會使用到 AbstractProcessor 這個類別，所以換言之就是我多了這個類別，
多了類別就表示多了程式碼。況且這只是一個小小的例子，在實際應用時，可能因此而產生非常非常多類別，
也就是多了很多很多程式碼。

這其中的關鍵點在於我們不希望讓顯顯知道處處的存在，因為這樣就會減少了設計彈性，所以才用 AbstractProcessor 取代處處，
只要處處符合 AbstractProcessor 定義的格式(此例為 process 函式)即可。而 Signals/Slots 這種機制可以漂亮的解決這個問題，
並不需要多設計 AbstractProcessor 這個類別就可以達成相同的目的。 

回憶一下，顯顯和處處分別負責什麼事？，顯顯負責「當有人按下按鈕，就會將這個訊息告訴處處」，而處處則是「當收到訊息後，處理核彈發射的工作」。
換個角度想就是顯顯會「發送訊號」，而處處會「接收訊號」。

因此在開發 Qt 的應用程式時，我們會這樣設計：

.. code-block:: c++

    /*
     * 小雞顯顯之 Qt 進化版
     */

    class Button: public QObject
    {
        Q_OBJECT
    public:

        void onClicked()
        {
            emit clicked(); //當按鈕按下時，會發送 clicked 訊號
        }

    signals: //定義「訊號」

        void clicked();
    };

可以注意到上面程式碼中有一個特異之處，那就是 signals 這個標籤。這是 Qt 特別定義的標籤，
表示後面定義的函式都代表「訊號(Signal)」，這種函式不用實作，定義函式名稱和所需參數即可。
而這些訊號可以透過 emit 這個關鍵字發射。上面程式碼定義的 Button 類別只做一件事，當按鈕按下時，便發送 clicked 訊號。

至於處處則可以這樣設計：

.. code-block:: c++

    /*
     * 小雞處處之 Qt 進化版
     */

    class Processor: public QObject
    {
        Q_OBJECT
    public slots:

        void process()
        {
            //處理核彈發射
        }
    };

和原來的設計方式幾乎一樣，差別在 public slots 這個標籤，這個標籤同樣也是 Qt 定義的，
代表可以接受「訊號」的函式(Slot)。

最後我就可以利用 Qt 定義的 QObject::connect 函式將兩者相連接：

.. code-block:: c++

    //QObject::connect(顯顯, SIGNAL(有人按下按鈕！), 處處, SLOT(處理核彈發射));

    QObject::connect(button, SIGNAL(clicked()), processor, SLOT(process()));

先不管這個語法是如何做到的，這個函式的意思是將顯顯(button)的 clicked 訊號與處處(processor)的 process 函式相連，
接下來只要顯顯的 clicked 訊號被發射，那就執行處處的 process 函式。

可以看到幾個明顯的好處，首先是我不需要讓顯顯知道處處的存在，
只要 processor 定義的 public slots 裡函式符合 button 的 clicked 所要求的格式便可相連，
也不用定義一個額外的類別 AbstractProcessor。

就好像在顯顯和處處之間建立一個通道，兩隻雞不用互相知道對方，一個只要記得往那個通道丟訊息，
另一個只要記得從那個通道接收訊息就行了。而顯顯也不用像原來那樣用一個成員變數來紀錄具體的 AbstractProcessor 為何，
也可減少很多程式碼。

而且不只可以丟訊息，也可以丟資料，比如說定義的「訊號」包含兩個參數：

.. code-block:: c++

    class Sender: public QObject
    {
        Q_OBJECT
    signals:

        void mySignal(int x, int y);
    };
    ...

    class Receiver: public QObject 
    {
    public slots:

        void onMySignal(int x, int y);
    };

只要傳送和接收的參數符合，就可以參遞參數的資料，兩者連接的語法和原來的相似，只是多了參數的部分而已：

.. code-block:: c++

    QObject::connect(sender, SIGNAL(mySignal(int, int)), receiver, SLOT(onMySignal(int, int)));

發射訊號時也和原來的相似，也是多了參數的部分：

.. code-block:: c++

    emit mySignal(4, 5);

最重要的是這種方式會做型別檢查，如果「訊號」的參數是字串型態，那麼接收「訊號」的函式就不能是數字型態，
因此可以減少很多錯誤的可能性。

另一方面，還有諸多好處像是我可以在不用撰寫修改程式碼的情況下讓「訊號」和不只一個接收「訊號」的函式相連接，
也可以讓多個「訊號」與同一個接收「訊號」的函式相連接。

Qt 的 Signals/Slots 機制可以有效的減少程式碼、增加可讀性，是一個強大好用的功能，
也是 Qt 運作的基礎。而這個概念雖然是從 Qt 發展，但事實上也不只是 Qt 使用這個機制，
好比 C++ 著名的函式庫 Boost 也有提供類似的功能。所以這種機制確實有其獨到之處，值得參考。

*「媽媽說，學 Signals/Slots 機制的小孩不會變壞！」*

