Change Log
##########

2017.10.5 (新增 RSS 和改善程式碼品質)
===========================

* 新增遊記分類、隱藏成功日記
* 支援 RSS
* 改進程式碼品質
* 刪除 sitemap.xml

2017.6.10 (新增實驗室頁面和改善程式碼品質)
===========================

* 修改出版號的方式
* 新增「兩大類實驗室」頁面
* 新增顯示後端版本資訊
* 新增「瘋狂模式」測試
* 改善「讀取中」的介面
* 改善專案架構和程式碼，並自行實作部分 Component
* 改善抓取的效能
* 調整 webpack 的設定檔
* 用 redux-saga 取代 redux-thunk

1.3.0 (效能改善)
============

* 移除非必要的 node modules (如：moment, history 等)
* 改變 module 的引用方式，避免引入無用的功能，以減少 bundle 大小
* 區分 articles 和 pages 的 query (減少 store 的大小和 query 所需的時間)
* 新增 cache 的功能
* 使用 PureComponent 增加繪製的效能
* 新增「非 Server render」的模式
* 處理 fetch api server 失敗的情況

1.2.1 (解 bug)
=============

* 新增 README.rst
* 解決換頁的 bug，並加上相關測試
* 將「最新文章」改為「近期文章」，並且改顯示同分類文章
* 整理 component / container 的程式碼

1.2.0
=====

* 調整 coding style 和檔案命名風格，並移除部分無用的程式碼
* 將設定檔的位置移至 /src/config/
* 調整 info 頁面的 style
* 刪除 redux-logger，並改用 redux-devtools-extension
* 整理 package.json，並移除部分的 modules
* 解決 react-disqus-thread 所產生的錯誤警告
* 新增單元測試
* 更新 NPM 函式庫

1.1.0
=====

* 新增 Google 識別碼以使用 Google 網站管理員
* 新增分享按鈕，如推持
* 修改 nginx 網頁快取時間從 30 天變成 7 天
* 自動依據佈署的模式設定預設 branch
* 新增 info 頁面顯示版本資訊(commit hash, 網站更新日期)
