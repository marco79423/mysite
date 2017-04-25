from django.core.management.base import BaseCommand
from mysite_backend import settings
from path import Path

from content import content_manager


class Command(BaseCommand):

    help = 'build content source files'

    def add_arguments(self, parser):
        parser.add_argument('source_dir', nargs='?', default=settings.SOURCE_DIR)
        pass

    def handle(self, *args, **options):
        manager = content_manager.ContentManager()
        source_dir = options['source_dir']

        if not isinstance(source_dir, Path):
            source_dir = Path(source_dir)

        manager.build(source_dir)
        self.stdout.write('Successfully build source "%s"' % source_dir)
