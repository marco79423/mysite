Change Log
##########

2017.8.0 (新增認證登入功能)
==========================

* 讓 fabric 可以自動選擇 branch
* 新增認證登入的功能
* 實作 /api/rebuild-tasks/
* 新增 celery 支援


2.0.0 (整理程式碼)
==========================

* 刪除無用的程式碼
* 解決不能下載檔案的問題
* 將 site-content 改名為 mysite-content
* 壓縮文章內容的 HTML 大小
* 新增 /api/info/ API 支援顯示後端版本資訊
* 使用 django-memcached 改善效能
* 重寫文章的 builder ，並補上測試以改善程式碼品質
* 新增 CHANGELOG.rst
* 更新使用的函式庫，包含將 Django 更新至 1.10.1
