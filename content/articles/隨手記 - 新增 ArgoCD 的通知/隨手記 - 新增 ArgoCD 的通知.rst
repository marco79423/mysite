##############################
隨手記 - 新增 ArgoCD 的通知
##############################

:date: 2023-05-12
:categories: 隨手記

自從我將主要的傳訊軟體從 LINE 改為 Telegram 後，我就一直想要整合所有通知到 Telegram，因為 Telegram 不像 LINE 有次數上限，我可以盡情使用，不怕超過上限，能更方便得到最即時的通知。

由於我的網站都是用 Argo CD 控管的，先前似乎有看到 Argo CD 也有相關的功能，可以直接用 Telegram 通知，所以決定這次就來嘗試看看。

順帶一提，我在寫這篇文章的時候，發現一個有趣的問題——那就是我不確定到底是 ArgoCD 還是 Argo CD？

我發現似乎兩者都有人用，但究竟哪一個才是對的呢？

雖然最後我決定用當前官方網站上的名稱，也就是 Argo CD，但不知為何我一直有稱作 ArgoCD 的印象？

不甘心的我為此還特地去查 `Wayback Machine <https://archive.org/web/>`__ 的記錄，發現從 Wayback Machine 有紀錄以來，官網確實一開始就叫 Argo CD……好吧，看來是我記錯了。

不管如何，這次的重點是 Telegram 的通知，經過 Google 查詢，我發現有一個稱作 `Argo CD Notifications <https://argocd-notifications.readthedocs.io/>`__ 的專案可以做到這一點，於是便安裝來嘗試。

但後來才發現其實這個專案早就在 `2.3 <https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/2.2-2.3/#v22-to-23>`__ 版時整合進 Argo CD 本體了，根本不需要另外裝什麼東西，原本就在運行，可以直接使用。

通知的設定也很簡單，關鍵是兩個 Resource，分別是叫做 ``argocd-notifications-cm`` 的 ConfigMap 和叫做 ``argocd-notifications-secret`` 的 Secret。

但其實所有的設定都是在 ``argocd-notifications-cm`` 上，另一個只是單純紀錄所使用到的機密資訊，如帳密、Token 資訊而已，可用可不用。

因此在嘗試階段，也可以直接設定在 ``argocd-notifications-cm`` 就好，確定沒問題以後再使用 ``argocd-notifications-secret``。

``argocd-notifications-cm`` 的設定主要可以分為幾個區塊：

-  Triggers

   -  代表發生通知的條件

-  Notification Services

   -  負責通知的服務，像是最基本的 Email 和這次要用的 Telegram

-  Subscriptions

   -  定義發送的條件和要發送的對象

-  Template

   -  通知訊息的樣版

argocd-notifications-cm 的例子：

.. code-block:: yaml

   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: argocd-notifications-cm
   data:
     # Trigger 發送通知的條件
     trigger.on-sync-failed: |
       - when: app.status.operationState.phase in ['Error', 'Failed']
         description: Application syncing has failed
         send:
           - app-sync-failed

     # Notification Services 通知服務，要用 Telegram Bot 就需設定 Token 
     service.telegram: |
       token: $telegram-token

     # Subscriptions 發生的條件和對象
     subscriptions: |
       - recipients:  # 要傳送的位置，格式所示，服務:位置
           - telegram:<chat_id>
         triggers:  # 傳送的條件
           - on-sync-failed
     
     # 訊息的樣版
     template.app-sync-failed: |
       message: |
         {{.app.metadata.name}} 出事啦: {{.app.status.operationState.message}}

（此例的 ``telegram:<chat_id>`` 的 ``<chat_id>`` 要換成要傳送的群組 ``chat_id``\ ，而 ``$telegram-token`` 則是我定義的變數，值設定在 ``argocd-notifications-secret``）

概念上就是設定推送的必要資訊，如用 Telegram 時就要有機器人的 token。

再來就是設定驅動的條件，可以針對個別 Application 設定，也可以直接在此設定全域的規則，比如說成功要通知、失敗要通知、狀態會 Unknown 的時候要通知等等。

至於傳送的訊息本身也是在此設定。如果有看官方的文件，文件上說可以執行：

.. code-block:: shell

   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/notifications_catalog/install.yaml

這其實就是定義一些預設的樣版（也就是剛才提的 Template），這樣就不用自己定義訊息內容了。但我認為自己的東西，用自己定義的訊息比較清楚，所以我個人是覺得參考一下，自己生就好，不需要用官方的樣版。

再來是 ``argocd-notifications-secret`` 的例子：

.. code-block:: yaml

   apiVersion: v1
   kind: Secret
   metadata:
     name: argocd-notifications-secret
   type: Opaque
   stringData:
     telegram-token: <token>


最後將設定部署到 Argo CD 中：

.. code-block:: shell

   kubectl apply -n argocd -f argocd-notifications-cm.yaml -f argocd-notifications-secret.yaml

搞定。

好吧，其實沒搞定。

看起來很簡單，但實際使用的時候還是遇到了問題。

不知道為何我一直沒有成功收到 Telegram 的通知，原本我以為是我哪些設定有問題，或是有什麼功能要啟用之類的？

經過研究後，我發現 Argo CD 應該是有成功驅動通知，但不知為何一直沒有辦法成功送出。

我猜有可能是 Argo CD 可能只支援 Telegram 特定類型的對話，我原本是設定 Telegram Bot 的 chat_id，想讓它直接傳訊息給我，既然一直沒成功，我決定建立一個新的 Telegram 群組，改成用群組的 chat_id （格式為 ``-`` 開頭的一串數字）試試，結果這次就真的成功了。

完美。
