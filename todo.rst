TODO
####

轉存空間
====

frontend: www.marco79423.net
backend: api.marco79423.net

frontend: dev.marco79423.net
backend: api-dev.marco79423.net

待辦事項
====

* 盡可能快速上線(第一目標)
    * 完成 backend 的佈署方式
        * 可以指定變數(測試用、正式用)
        * 可以指定只 rebuild content
        * 改為 dev
        * sudo 可以指定 user
    * 完成 frontned 的佈署方式
    * 留言功能
    * 切換域名 marco79423.twbbs.org => marco79423.net (記得處理 GA、網頁管理員、disqus、個人資料等)
    * html 2016 => 2017
* 改善基本 SEO
    * 跑分，改善建議事項
    * sitemap
    * HTTPS
    * 改善手機顯示的部分
        * 解決「我是一隻兩大類」會跑位的問題
    * 減少 route 不必要的 query
    * 解決 html head 的問題
    * redux-segment
* 改善程式碼品質
    * 補 test
    * 刪無用的 duck/main
    * bi eslintrc
    * use NPM shrinkwrap
    * pure-render-decorator
    * 改變 selector 的使用方式
    * 調整 Webpack 的 plugin (改善 Production mode 的效能)
    * 減少 Production mode 的警告
    * 整理 package.json 的 dependencies 和 devDependencies
    * import { concat } from 'lodash' https://lacke.mn/reduce-your-bundle-js-file-size/

發想
====

* article => post
* 自動化佈署
* Typescript ?
* GraphQL and Relay
* 搜尋欄是聊天機器人