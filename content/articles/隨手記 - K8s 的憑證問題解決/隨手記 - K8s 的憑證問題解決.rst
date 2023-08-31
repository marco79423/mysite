##################################################
隨手記 - K8s 的憑證問題解決
##################################################

:date: 2023-08-31
:categories: 隨手記

最近想幫自己的網站降低一些成本，我的主要網站是使用 GKE、Cloud SQL、Load Balancing 這幾個工具。

但這些組合有點太貴了，所以我打算減少使用 Load Balancing，不再使用 Google 的憑證，而改用 Cert Manager 搭配 Let’s Encrypt 的憑證。

其實我本來就有好幾個網站就有這樣使用了，所以原先以為不會出什麼差錯，應該一下就搞定的。

沒想到卻卡了很久，明明 Cert Manager 有正確的拿到憑證，但實際去網站卻還是顯示 K8S 自簽的憑證。

我找了很久都沒發現錯誤，無論是 ingress-nginx 還是 cert-manager 看起來都顯示正常，但就是無法使用。

一直研究好久，才終於在 ingress-nginx 的 github 討論區看到有人提到。

::

   It turned out to be because I was only using defaultBackend in my Ingress, because I don't actually care about host or path-named routing; it seems to not like that. Adding a proper rules entry which listed the full hostname fixed the issue for me.

(https://github.com/kubernetes/ingress-nginx/issues/4979#issuecomment-1635089483)

疑？確實就是我的情況，前陣子在配置 GCP 的 Load Balancing 時我才知道 defaultBackend 的用法，所以全都改成這種方式了。

（下面這種寫法）

.. code:: yaml

   spec:
     defaultBackend:
       service:
         name: wordpress
         port:
           number: 80

於是我改成自己指定 rule。

（下面這種寫法）

.. code:: yaml

   spec:
     rules:
       - host: xxxx.net
         http:
           paths:
             - path: /
               pathType: Prefix
               backend:
                 service:
                   name: wordpress
                   port:
                     number: 80

成功！

因為花了不少時間研究，所以留下記錄，給之後碰到同樣問題的人。
