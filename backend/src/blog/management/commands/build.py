from django.core.management.base import BaseCommand
from path import Path

from blog.domain_injector import domain_injector
from domain.base_types import Request
from domain.blog.use_cases.generate_blog_data import GenerateBlogDataUseCase
from mysite_backend import settings


class Command(BaseCommand):
    help = 'build content source files'

    def add_arguments(self, parser):
        parser.add_argument('source_dir', nargs='?', default=settings.SOURCE_DIR)
        pass

    def handle(self, *args, **options):
        source_dir = options['source_dir']

        if not isinstance(source_dir, Path):
            source_dir = Path(source_dir)

        uc = domain_injector.get(GenerateBlogDataUseCase)
        res = uc.execute(Request(source_dir))
        if res:
            self.stdout.write('Successfully build source "%s"' % source_dir)
        else:
            self.stderr.write(res.reason)
