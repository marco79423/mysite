import re
from multiprocessing.pool import ThreadPool

import slugify
from django.core.files import File
from PIL import Image

from app.models import Article, Category, WebPage, AppFile
from app.services.content_manager.content_spider import ContentSpider
from mysite import settings


class ContentManager:

    STATIC_IMAGE_URL = settings.HOST + settings.STATIC_URL + "images/"
    STATIC_IMAGE_DIR = settings.STATIC_ROOT / "images"

    MEDIA_APPFILE_DIR = settings.MEDIA_ROOT / "appfiles"

    def __init__(self):
        self._content_spider = ContentSpider()

    def clean(self):
        Article.objects.all().delete()
        Category.objects.all().delete()
        WebPage.objects.all().delete()
        AppFile.objects.all().delete()

        self.STATIC_IMAGE_DIR.rmtree_p()
        self.MEDIA_APPFILE_DIR.rmtree_p()

    def build(self, source_dir):
        if not source_dir.exists():
            raise FileNotFoundError('source_dir "{}" does not exist'.format(source_dir))

        self.clean()

        pool = ThreadPool()
        for article_data in self._content_spider.parse(source_dir / "articles"):
            pool.apply_async(self._process_article_data, (article_data, ))

        for page_data in self._content_spider.parse(source_dir / "web_pages"):
            pool.apply_async(self._process_page_data, (page_data,))

        pool.close()
        pool.join()

    def _process_article_data(self, article_data):
        content = article_data.content
        content = self._setup_item_images(content, article_data)
        content = self._setup_item_files(content, article_data)

        summary = self._get_summary(content, 15)
        article = Article.objects.create(
            slug=article_data.slug,
            title=article_data.title,
            date=article_data.date,
            modified_date=article_data.modified_date,
            content=content,
            summary=summary,
            raw_summary=self._remove_html_tags(summary),
            series=article_data.series,
            cover=None,
        )

        for category_name in article_data.categories:
            category, _ = Category.objects.get_or_create(
                slug=slugify.slugify(category_name),
                name=category_name,
            )
            article.categories.add(category)

    def _process_page_data(self, page_data):
        content = page_data.content
        content = self._setup_item_images(content, page_data)
        content = self._setup_item_files(content, page_data)

        WebPage.objects.create(
            app="me",
            slug=page_data.slug,
            title=page_data.title,
            content=content,
        )

    def _setup_item_images(self, content, item_data):
        for item_image in item_data.item_images:
            _, _, basename = item_image['link'].rpartition("/")
            target_dir = self.STATIC_IMAGE_DIR / item_data.slug
            self._save_optimized_images(item_image['path'], target_dir)

            content = content.replace(item_image['link'], self.STATIC_IMAGE_URL + item_data.slug + "/" + basename)
        return content

    def _setup_item_files(self, content, item_data):
        for item_file in item_data.item_files:
            _, _, basename = item_file['link'].rpartition("/")
            app_file = AppFile(slug=item_data.slug + "/" + slugify.slugify(basename))
            with open(item_file['path'], "rb") as fp:
                app_file.file.save(name=basename, content=File(fp))
            app_file.save()

            content = content.replace(item_file['link'], "/files/" + app_file.slug + "/")
        return content

    @staticmethod
    def _save_optimized_images(source_path, target_dir):
        target_dir.makedirs_p()
        if source_path.ext == ".gif":
            source_path.copy(target_dir)
        else:
            image = Image.open(source_path)
            image.save(target_dir / source_path.name, quality=75, optimize=True)

    @staticmethod
    def _get_summary(content, max_length):
        from pelican.utils import truncate_html_words
        return truncate_html_words(content, max_length)

    @staticmethod
    def _remove_html_tags(content):
        return re.sub(r'<[^>]+>', "", content)
