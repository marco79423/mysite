from django.core.paginator import PageNotAnInteger, EmptyPage
from django.db.models import Q
from django.shortcuts import render, get_object_or_404

from apps.content_manager.models import Category, Article, WebPage
from apps.blog.utils import CustomPaginator


def get_article_page(request, slug):
    article = get_object_or_404(Article, Q(title=slug) | Q(slug=slug))
    return render(request, 'blog/article.html', {
        'article': article,
    })


def get_web_page(request, app, slug):
    web_page = get_object_or_404(WebPage, Q(app=app), Q(title=slug) | Q(slug=slug))
    return render(request, 'blog/web_page.html', {
        'web_page': web_page,
    })


def get_article_list_page(request, page_num=1):
    page_num = int(page_num)

    paginator = CustomPaginator(Article.objects.all().exclude(category__name="胡言亂語").reverse(), 10)
    try:
        page = paginator.page(page_num)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        page = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        page = paginator.page(paginator.num_pages)

    return render(request, 'blog/article_list.html', {
        'page': page,
    })


def get_category_page(request, slug, page_num=1):
    page_num = int(page_num)
    category = get_object_or_404(Category, slug=slug)
    paginator = CustomPaginator(Article.objects.filter(category=category).reverse(), 10)
    try:
        page = paginator.page(page_num)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        page = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        page = paginator.page(paginator.num_pages)

    return render(request, 'blog/category.html', {
        'category_slug': slug,
        'page': page,
    })


def get_archives_page(request):
    return render(request, 'blog/archives.html', {
        'articles': Article.objects.all().reverse(),
    })
