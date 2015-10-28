from django.http import Http404
from django.shortcuts import redirect

from apps.content_manager.models import Article


def get_old_slug_page(request, slug):
    from pelican.utils import slugify
    for article in Article.objects.all():
        if slug == slugify(article.title):
            return redirect('article_page', permanent=True, slug=article.slug)
    raise Http404
