Change Log
##########

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
