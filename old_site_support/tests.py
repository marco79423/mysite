from django.core.urlresolvers import reverse
from django.templatetags.static import static
from django.test import TestCase

from content_manager.models import Article, Category


class OldSiteUrlTest(TestCase):

    def create_article(self):
        return Article.objects.create(
            slug="article_slug",
            title="article_title",
            date="2015-08-18",
            modified_date="2015-08-23",
            category=Category.objects.create(slug="category_slug", name="category_name"),
            content="content",
            summary="summary",
            cover=static("base/img/logo.jpg"),
        )

    def test_getting_old_slug_page(self):
        article = self.create_article()

        from pelican.utils import slugify
        old_slug = slugify(article.title)
        response = self.client.get(reverse('old_slug_page', args=(old_slug, )), follow=True)
        self.assertRedirects(response, reverse('article_page', args=(article.slug, )), status_code=301)
