from django.core.urlresolvers import reverse
from django.templatetags.static import static
from django.test import TestCase

from blog.models import Article, Category, WebPage


class PageTest(TestCase):

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

    def create_web_page(self):
        return WebPage.objects.create(
            app="app",
            slug="page_slug",
            title="page_title",
            content="content",
        )

    def test_getting_article_with_different_slugs(self):
        article = self.create_article()
        response = self.client.get(reverse('article_page', args=(article.slug,)))
        self.assertEqual(response.context['article'], article)
        self.assertTemplateUsed(response, 'blog/article.html')
        self.assertContains(response, article.content, status_code=200)

        response = self.client.get(reverse('article_page', args=(article.title,)))
        self.assertEqual(response.context['article'], article)
        self.assertTemplateUsed(response, 'blog/article.html')
        self.assertContains(response, article.content, status_code=200)

    def test_getting_web_page_with_different_slugs(self):
        web_page = self.create_web_page()
        response = self.client.get(reverse('web_page_page', args=(web_page.app, web_page.slug,)))
        self.assertEqual(response.context['web_page'], web_page)
        self.assertTemplateUsed(response, 'blog/web_page.html')
        self.assertContains(response, web_page.content, status_code=200)

        response = self.client.get(reverse('web_page_page', args=(web_page.app, web_page.title,)))
        self.assertEqual(response.context['web_page'], web_page)
        self.assertTemplateUsed(response, 'blog/web_page.html')
        self.assertContains(response, web_page.content, status_code=200)

    def test_getting_article_page(self):
        article = self.create_article()
        response = self.client.get(reverse('article_page', args=(article.slug,)))

        self.assertEqual(response.context['article'], article)
        self.assertTemplateUsed(response, 'blog/article.html')
        self.assertContains(response, article.content, status_code=200)

    def test_getting_web_page_page(self):
        web_page = self.create_web_page()
        response = self.client.get(reverse('web_page_page', args=(web_page.app, web_page.slug,)))

        self.assertEqual(response.context['web_page'], web_page)
        self.assertTemplateUsed(response, 'blog/web_page.html')
        self.assertContains(response, web_page.content, status_code=200)

    def test_getting_article_list_page(self):
        article = self.create_article()
        response = self.client.get(reverse('article_list_page'))

        self.assertIn(article, response.context['page'].object_list)
        self.assertTemplateUsed(response, 'blog/article_list.html')
        self.assertContains(response, article.summary, status_code=200)

    def test_getting_article_list_page_with_page_num(self):
        article = self.create_article()
        response = self.client.get(reverse('article_list_page_with_page_num', args=(1, )))

        self.assertIn(article, response.context['page'].object_list)
        self.assertTemplateUsed(response, 'blog/article_list.html')
        self.assertContains(response, article.summary, status_code=200)

    def test_getting_category_page(self):
        article = self.create_article()
        response = self.client.get(reverse('category_page', args=(article.category.slug, )))

        self.assertEqual(response.context['category_slug'], article.category.slug)
        self.assertIn(article, response.context['page'].object_list)
        self.assertTemplateUsed(response, 'blog/category.html')
        self.assertContains(response, article.summary, status_code=200)

    def test_getting_category_page_with_page_num(self):
        article = self.create_article()
        response = self.client.get(reverse('category_page_with_page_num', args=(article.category.slug, 1, )))

        self.assertEqual(response.context['category_slug'], article.category.slug)
        self.assertIn(article, response.context['page'].object_list)
        self.assertTemplateUsed(response, 'blog/category.html')
        self.assertContains(response, article.summary, status_code=200)

    def test_getting_archives_page(self):
        article = self.create_article()
        response = self.client.get(reverse('archives_page'))

        self.assertIn(article, response.context['articles'])
        self.assertTemplateUsed(response, 'blog/archives.html')

    def test_getting_old_slug_page(self):
        article = self.create_article()

        from pelican.utils import slugify
        old_slug = slugify(article.title)
        response = self.client.get(reverse('old_slug_page', args=(old_slug, )), follow=True)
        self.assertRedirects(response, reverse('article_page', args=(article.slug, )), status_code=301)
