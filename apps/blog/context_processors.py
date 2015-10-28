from apps.content_manager.models import Article, CategoryMenu, WebPageMenu

SITE_SETTINGS = {
    'SITE_NAME': "兩大類 x 兩大類 = 四大類",

    'META_KEYWORDS': "Python,Qt,C++,兩大類",
    'META_DESCRIPTION': "兩大類的個人網站，主要都是在寫學習心得(Python, Qt, C++, 程式技能等)、作品和一些胡言亂語的東西",
    'META_AUTHOR': "兩大類",

    'DISQUS_SITENAME': "marco79423",

    'latest_articles': Article.objects.all().reverse()[:5],
    'category_menu': CategoryMenu.objects.all(),
    'web_page_menu': WebPageMenu.objects.all(),
}


def site_setting_loader(request):
    _ = request
    return SITE_SETTINGS
