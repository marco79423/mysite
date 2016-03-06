from app.models import Article

SITE_SETTINGS = {
    'SITE_NAME': "兩大類 x 兩大類 = 四大類",

    'META_KEYWORDS': "Python,Qt,C++,兩大類",
    'META_DESCRIPTION': "兩大類的個人網站，主要都是在寫學習心得(Python, Qt, C++, 程式技能等)、作品和一些胡言亂語的東西",
    'META_AUTHOR': "兩大類",

    'DISQUS_SITENAME': "marco79423",

    'latest_articles': Article.objects.all().reverse()[:5],
    'category_menu': [
        {'title': "Python", 'slug': "/articles/category/python/"},
        {'title': "專案作品", 'slug': "/articles/category/專案作品/"},
        {'title': "程式設計", 'slug': "/articles/category/程式設計/"},
        {'title': "UNIX & 工具", 'slug': "/articles/category/unix-工具/"},
        {'title': "胡言亂語", 'slug': "/articles/category/胡言亂語/"},
    ],
    'web_page_menu': [
        {'title': "閱讀計劃", 'slug': "/me/閱讀計劃/"},
        {'title': "成功日記", 'slug': "/me/成功日記/"},
    ],
}


def site_setting_loader(request):
    _ = request
    return SITE_SETTINGS
