from django.core.files import File
from path import Path
from slugify import slugify

from blog.content_manager import RstTransformer
from blog.models import Category, Article, WebPage, AppFile
from mysite import settings


class BaseSourceBuilder:

    dir_name = None
    file_pattern = None

    def build(self, source_dir):
        target_dir = source_dir / self.dir_name
        if not target_dir.exists():
            return

        self.remove_all()
        for item in target_dir.walkfiles(self.file_pattern):
            self.create_item(item)

    def remove_all(self):
        pass

    def create_item(self, item):
        pass


class ArticleBuilder(BaseSourceBuilder):

    dir_name = "articles"
    file_pattern = "*.rst"

    def __init__(self):
        self._rst_transformer = RstTransformer()

    def remove_all(self):
        Category.objects.all().delete()
        Article.objects.all().delete()

    def create_item(self, file_path):
        content, metadata = self._rst_transformer.transform_rst_to_html(file_path)

        category, _ = Category.objects.get_or_create(
            slug=slugify(file_path.abspath().dirname().name),
            name=file_path.dirname().name,
        )

        Article.objects.create(
            slug=slugify(metadata['title']),
            title=metadata['title'],
            date=metadata['date'],
            modified_date=metadata['modified_date'],
            category=category,
            content=content,
            summary=metadata['summary'],
            cover=metadata['cover'],
        )


class WebPageBuilder(BaseSourceBuilder):

    dir_name = "web_pages"
    file_pattern = "*.rst"

    def __init__(self):
        self._rst_transformer = RstTransformer()

    def remove_all(self):
        WebPage.objects.all().delete()

    def create_item(self, file_path):
        content, metadata = self._rst_transformer.transform_rst_to_html(file_path)

        WebPage.objects.create(
            app=slugify(file_path.abspath().dirname().name),
            slug=slugify(metadata['title']),
            title=metadata['title'],
            content=content,
        )


class ImageBuilder(BaseSourceBuilder):

    dir_name = "images"
    target_dir = Path(settings.STATIC_ROOT) / "images"

    def remove_all(self):
        self.target_dir.rmtree_p()

    def create_item(self, file_path):
        dir_name = slugify(file_path.abspath().dirname().name)
        target_dir = self.target_dir / dir_name
        target_dir.makedirs_p()
        file_path.copy(target_dir)


class AppFileBuilder(BaseSourceBuilder):

    dir_name = "appfiles"
    target_dir = Path(settings.MEDIA_ROOT) / "appfiles"

    def remove_all(self):
        self.target_dir.rmtree_p()
        AppFile.objects.all().delete()

    def create_item(self, file_path):
        filename = file_path.name
        app_file = AppFile()
        app_file.slug = slugify(filename)
        with open(file_path, "rb") as fp:
            app_file.file.save(name=filename, content=File(fp))
        app_file.save()
