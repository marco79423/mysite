from path import Path

from django.core.management.base import BaseCommand
from blog.content_manager import ContentManager

from mysite import settings


class Command(BaseCommand):

    help = 'build content source files'

    def add_arguments(self, parser):
        parser.add_argument('source_dir', nargs='?', default=settings.SOURCE_DIR)
        pass

    def handle(self, *args, **options):
        content_manager = ContentManager()
        source_dir = options['source_dir']

        if not isinstance(source_dir, Path):
            source_dir = Path(source_dir)

        content_manager.build(source_dir)
        self.stdout.write('Successfully build source "%s"' % source_dir)
