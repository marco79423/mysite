from multiprocessing.pool import ThreadPool

import slugify
from PIL import Image
from css_html_js_minify import html_minify
from django.core.files import File

from content import entities
from content import store
from content.models import AppFile
from libs import rst_transformer
from mysite_backend import settings


class ContentSpider:
    def parse(self, base_dir):
        items = []
        for item_dir in base_dir.dirs():
            file_path = self._get_article_path(item_dir)
            items.append(rst_transformer.transform_rst_to_html(file_path))
        return items

    @staticmethod
    def _get_article_path(item_dir):
        for file_path in item_dir.files():
            if item_dir.abspath().name in file_path:
                return file_path
        raise FileNotFoundError


class ContentManager:
    STATIC_IMAGE_URL = settings.HOST + settings.MEDIA_URL + "images/"

    MEDIA_IMAGE_DIR = settings.MEDIA_ROOT / "images"
    MEDIA_APPFILE_DIR = settings.MEDIA_ROOT / "appfiles"

    def __init__(self):
        self._content_spider = ContentSpider()

    def clean(self):
        store.ArticleStore.clean()
        store.WebPageStore.clean()

        self.MEDIA_IMAGE_DIR.rmtree_p()
        self.MEDIA_APPFILE_DIR.rmtree_p()

    def build(self, source_dir):
        if not source_dir.exists():
            raise FileNotFoundError('source_dir "{}" does not exist'.format(source_dir))

        self.clean()

        pool = ThreadPool()
        for article_data in self._content_spider.parse(source_dir / "articles"):
            pool.apply_async(self._process_article_data, (article_data,))

        for page_data in self._content_spider.parse(source_dir / "web_pages"):
            pool.apply_async(self._process_page_data, (page_data,))

        pool.close()
        pool.join()

    def _process_article_data(self, article_data):
        content = article_data.content
        content = self._setup_item_images(content, article_data)
        content = self._setup_item_files(content, article_data)
        content = html_minify(content)

        store.ArticleStore.create(entities.Article(
            title=article_data.title,
            date=article_data.date,
            modified_date=article_data.modified_date,
            content=content,
            categories=[entities.Category(category) for category in article_data.categories],
            series=article_data.series
        ))

    def _process_page_data(self, page_data):
        content = page_data.content
        content = self._setup_item_images(content, page_data)
        content = self._setup_item_files(content, page_data)
        content = html_minify(content)

        store.WebPageStore.create(entities.WebPage(
            app="me",
            title=page_data.title,
            content=content
        ))

    def _setup_item_images(self, content, item_data):
        for item_image in item_data.item_images:
            target_dir = self.MEDIA_IMAGE_DIR / slugify.slugify(item_data.title)
            self._save_optimized_images(item_image.file_path, target_dir)

            content = content.replace(item_image.original_url,
                                      self.STATIC_IMAGE_URL + slugify.slugify(item_data.title) + "/" + item_image.basename)
        return content

    def _setup_item_files(self, content, item_data):
        for item_file in item_data.item_files:
            app_file = AppFile(slug=slugify.slugify(item_data.title + "/" + item_file.basename))
            with open(item_file.file_path, "rb") as fp:
                app_file.file.save(name=item_file.basename, content=File(fp))
            app_file.save()

            content = content.replace(item_file.original_url, settings.HOST + "/files/" + app_file.slug + "/")
        return content

    @staticmethod
    def _save_optimized_images(source_path, target_dir):
        target_dir.makedirs_p()
        if source_path.ext == ".gif":
            source_path.copy(target_dir)
        else:
            image = Image.open(source_path)
            image.save(target_dir / source_path.name, quality=75, optimize=True)
