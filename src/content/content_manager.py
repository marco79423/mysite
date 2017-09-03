import slugify
import htmlmin

from content import entities
from content import store
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
    BASE_IMAGE_URL = settings.HOST + settings.MEDIA_URL + "images/"
    BASE_APPFILE_URL = settings.HOST + settings.MEDIA_URL + "appfiles/"

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

        for article_data in self._content_spider.parse(source_dir / "articles"):
            self._process_article_data(article_data)

        for page_data in self._content_spider.parse(source_dir / "web_pages"):
            self._process_page_data(page_data)

    def _process_article_data(self, article_data):
        content = article_data.content
        content = self._setup_item_images(content, article_data.title, article_data.item_images)
        content = self._setup_item_files(content, article_data.item_files)
        content = htmlmin.minify(content)

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
        content = self._setup_item_images(content, page_data.title, page_data.item_images)
        content = self._setup_item_files(content, page_data.item_files)
        content = htmlmin.minify(content)

        store.WebPageStore.create(entities.WebPage(
            app="me",
            title=page_data.title,
            content=content
        ))

    def _setup_item_images(self, content, title, item_images):
        for item_image in item_images:
            target_dir = self.MEDIA_IMAGE_DIR / slugify.slugify(title)
            target_dir.makedirs_p()

            (target_dir / item_image.basename).write_bytes(item_image.data)
            content = content.replace(item_image.original_url,
                                      self.BASE_IMAGE_URL + slugify.slugify(title) + "/" + item_image.basename)
        return content

    def _setup_item_files(self, content, item_files):
        self.MEDIA_APPFILE_DIR.makedirs_p()
        for item_file in item_files:
            (self.MEDIA_APPFILE_DIR / item_file.basename).write_bytes(item_file.data)
            content = content.replace(item_file.original_url, self.BASE_APPFILE_URL + "/" + item_file.basename)
        return content
