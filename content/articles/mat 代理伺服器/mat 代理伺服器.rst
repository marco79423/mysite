mat 代理伺服器
############################

:date: 2021-3-02
:categories: 專案作品
:cover: images/1.png

.. image:: images/1.png

Github：https://github.com/marco79423/mat-server

後端開發用代理伺服器，能攔截設定的 API，直接回傳指定的結果，其餘則直接轉發實際伺服器的回傳值。

    客戶端 -> mat server -> 實際的伺服器

在開發新功能的時候，時常後端功能尚未開發完成，前端必須等待後端功能完成後才能開發的情況，透過 mat 代理伺服器可以直接設定好預計的回傳內容，讓前端不需要通靈開發。

適合小專案快速開發，可以直接架在後端的電腦上，讓前端連進來，隨時可以修改 API 格式。

特色：

* 隨時可以修改設定，自動更新回傳值內容
* 支援 query string
* 支援取代函式


安裝
====

透過 pip 安裝
----------------

>>> pip install mat-server

使用方法
=========

命令列操作
-------------

.. code-block:: bash

    # 初始化 mat (產生 mat-data 設定資料夾)
    mat init

    # 啟動伺服器 (<http://0.0.0.0:3000>)
    mat -p 3000

設定檔相關
------------

產生的 mat-data 資料夾架構如下：

::

    mat-data/
        config.yml               # 設定要代理的伺服器等設定
        data/
            hello.json

mat-server 會直接使用當前目錄下的 mat-data/config.yml 設定檔，只有這個是固定的，其他的回傳值內容都可以自由設定，比如說只要指定好路徑， data/hello.json 其實也可以放在 mat-data 外面。

其中 config.yml 的格式如下：

.. code-block:: yaml

    server:
      proxy_url: http://target_server  # 要代理的伺服器
    routes:
      - listen_path: "hello/name"     # 要攔截的路由  (http://target_server/hello)
        method: GET                   # HTTP Method  (預設為 GET)
        status_code: 200              # 回傳的 status code (預設為 200 OK)
        response:                     # 回傳值設定
          data:
            msg: hello world          # 回傳 {"msg": "hello world"}
      - listen_path: hello
        query:                        # 設定 query string (http://target_server/hello?name=marco
          name: marco
        response:
          file_path: data/hello.json  # 回傳 hello.json 的檔案內容

範例： 直接透過 config.yml 設定路由和回傳值

.. code-block:: yaml

    server:
      proxy_url: <https://marco79423.net>
    routes:
      - listen_path: backend/api/articles/
        response:
          data:
            - title: Hello mat-server
              content: 歡迎使用 mat-server

進階用法
==========

參數化 listen_path
--------------------

listen_path 是使用正規表達式 (regex) 判斷是否符合，所以碰到需要無視參數內容時可以使用。

範例： 使用 regex 設定 listen_path

.. code-block:: yaml

    server:
      proxy_url: <https://marco79423.net>
    routes:
      - listen_path: "backend/api/articles/\\\\\\\\d+"
        response:
          data:
            title: Hello mat-server
            content: 歡迎使用 mat-server

取代函式
-----------------------------------

可以使用 replace_funcs 取代值。

目前可以支援的 replace_funcs：

============ ========= =================
 函式         名稱      說明
------------ --------- -----------------
 uuid_v4      UUID v4   用 UUID v4 取代
 random_int   亂數      用亂數整數取代
============ ========= =================

範例： 使用函式函式設定 config.yml

.. code-block:: yaml

    server:
      proxy_url: <https://marco79423.net>
    routes:
      - listen_path: backend/api/articles/
        response:
          replace_funcs:
            - uuid_v4                          # 看見 {uuid_v4()} 就會取代為 UUID v4 回傳
            - random_int                       # 看見 {random_int(start, end) 就會用亂數取代
          data:
            - requestID: {uuid_v4()}
              title: Hello mat-server
              content: 歡迎使用 mat-server (目前在線人數 {random_int(100, 1000)})

當作函式庫使用
-----------------------------------

mat 內部使用 FastAPI 當作 Server。

.. code-block:: python

    import fastapi
    import uvicorn
    import mat_server

    app = fastapi.FastAPI()

    # 實作自己的路由
    @app.get('/hello')
    async def hello():
        return 'hello'

    # 取得 mat_server 所使用的 API Router
    manager = mat_server.manager
    api_router = manager.get_server_api_router()
    app.include_router(api_router)

    # 啟動服務器
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)


特殊路由
-----------------------------------

**GET /_mat**

回傳設定檔的內容

.. code-block:: json

    {
      "server": {
        "proxy_url": "<https://marco79423.net>"
      },
      "routes": [
        {
          "listen_path": "backend/api/articles/",
          "response": {
            "data": [
              {
                "title": "Hello mat-server",
                "content": "歡迎使用 mat-server"
              }
            ]
          }
        }
      ]
    }

FAO
=====

決定回傳 Content-Type 的策略？
-----------------------------------

如果是回傳 mock 資料，會根據設定檔的設定決定 Content-Type，使用 file_path 或是用 data 會有不同的策略。

使用 data 的情況：

* 如果 data 是字串，就會直接當成網頁型態 (text/html; charset=utf-8)
* 除此之外都當作 JSON 型態 (application/json)

使用 file_path 的情況：

* 會根據副檔名來猜測型態，比如說 xxx.jpg 就會是 image/jpeg
* 如果沒有副檔名或是猜不到，就會當成網頁型態 text/html; charset=utf-8

實作相關
======================

專案架構
-----------------------------------

::

    setup.py
    requirements.txt
    mat_server/
        __init__.py                             # 函試庫進入點
        __main__.py                             # 主程式進入點
        app/                                    # 應用層
            container.py                        # DI container
            cli.py                              # 命令列設定
            manager.py                          # 功能管理
            server.py                           # 服務器設定
                ...
        domain/                                 # 領域層
            use_cases/                          # 領域的用例
                ...
            entities/                           # 領域的實例
                ...
            repositories/                       # 領域的儲存庫
                ...
            helpers/                            # 工具包
                ...
        infrastrcture/                          # 實作層
            repositories/
                ...
            helpers/
                ...
        data/                                   # 放置靜態檔案 (如預設設定檔)
