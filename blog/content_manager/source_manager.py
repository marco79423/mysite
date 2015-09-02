from blog.content_manager import RstTransformer
from blog.models import Category, Article, WebPage
from blog.utils import slugify


class ArticleManager:

    def __init__(self, static_image_dir):
        self._rst_transformer = RstTransformer()
        self._static_image_dir = static_image_dir / "articles"

    def remove_all(self):
        Category.objects.all().delete()
        Article.objects.all().delete()
        if self._static_image_dir.exists():
            self._static_image_dir.rmtree()

    def create(self, file_path, image_source_dir):
        content, metadata = self._rst_transformer.transform_rst_to_html(file_path)

        category, _ = Category.objects.get_or_create(
            url=slugify(file_path.dirname().name),
            name=file_path.dirname().name,
        )

        url = slugify(metadata['title'])
        article = Article.objects.create(
            url=url,
            title=metadata['title'],
            date=metadata['date'],
            modified_date=metadata['modified_date'],
            category=category,
            content=content,
            summary=metadata['summary'],
            cover=metadata['cover'],
        )

        article_image_dir = image_source_dir / article.title
        if article_image_dir.exists():
            article_image_dir.copytree(self._static_image_dir / article.url)


class WebPageManager:

    def __init__(self, static_image_dir):
        self._rst_transformer = RstTransformer()
        self._static_image_dir = static_image_dir / "web_pages"

    def remove_all(self):
        WebPage.objects.all().delete()
        if self._static_image_dir.exists():
            self._static_image_dir.rmtree()

    def create(self, file_path, image_source_dir):
        content, metadata = self._rst_transformer.transform_rst_to_html(file_path)

        url = slugify(metadata['title'])
        web_page = WebPage.objects.create(
            app=file_path.dirname().name,
            url=url,
            title=metadata['title'],
            content=metadata['summary'],
        )

        web_page_image_dir = image_source_dir / web_page.title
        if web_page_image_dir.exists():
            web_page_image_dir.copytree(self._static_image_dir / web_page.url)
