import json

from content_manager.models import Category, WebPage, WebPageMenu, CategoryMenu
from content_manager.source_builders import ArticleBuilder, WebPageBuilder, ImageBuilder, AppFileBuilder


class ContentManager:

    SOURCE_BUILDERS = [ArticleBuilder, WebPageBuilder, ImageBuilder, AppFileBuilder]

    def __init__(self):
        self._source_builders = [builder_class() for builder_class in self.SOURCE_BUILDERS]

    def build(self, source_dir):
        if not source_dir.exists():
            raise FileNotFoundError('source_dir "{}" does not exist'.format(source_dir))

        self._build_sources(source_dir)
        self._create_menu(source_dir)

    def _build_sources(self, source_dir):
        for builder in self._source_builders:
            builder.build(source_dir)

    @staticmethod
    def _create_menu(source_dir):
        config_file = source_dir / 'config.json'
        if not config_file.exists():
            raise FileNotFoundError('config "{}" does not exist'.format(source_dir / 'config.json'))

        config = json.loads(config_file.text(encoding="utf-8"))

        CategoryMenu.objects.all().delete()
        for order, category in enumerate(config['category_menu']):
            CategoryMenu.objects.create(
                category=Category.objects.get(name=category),
                order=order,
            )

        WebPageMenu.objects.all().delete()
        for order, web_page_title in enumerate(config['web_page_menu']):
            WebPageMenu.objects.create(
                web_page=WebPage.objects.get(title=web_page_title),
                order=order,
            )
