from multiprocessing.pool import ThreadPool

import slugify
from PIL import Image
from django.core.files import File

from content import entities
from content import store
from content.models import AppFile
from content.services.content_manager.content_spider import ContentSpider
from mysite_backend import settings


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

        store.WebPageStore.create(entities.WebPage(
            app="me",
            title=page_data.title,
            content=content
        ))

    def _setup_item_images(self, content, item_data):
        for item_image in item_data.item_images:
            _, _, basename = item_image['link'].rpartition("/")
            target_dir = self.MEDIA_IMAGE_DIR / slugify.slugify(item_data.title)
            self._save_optimized_images(item_image['path'], target_dir)

            content = content.replace(item_image['link'],
                                      self.STATIC_IMAGE_URL + slugify.slugify(item_data.title) + "/" + basename)
        return content

    def _setup_item_files(self, content, item_data):
        for item_file in item_data.item_files:
            _, _, basename = item_file['link'].rpartition("/")
            app_file = AppFile(slug=slugify.slugify(item_data.title + "/" + basename))
            with open(item_file['path'], "rb") as fp:
                app_file.file.save(name=basename, content=File(fp))
            app_file.save()

            content = content.replace(item_file['link'], settings.HOST + "/files/" + app_file.slug + "/")
        return content

    @staticmethod
    def _save_optimized_images(source_path, target_dir):
        target_dir.makedirs_p()
        if source_path.ext == ".gif":
            source_path.copy(target_dir)
        else:
            image = Image.open(source_path)
            image.save(target_dir / source_path.name, quality=75, optimize=True)
