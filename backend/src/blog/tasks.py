from celery import shared_task

from blog import content_manager
from mysite_backend import settings


@shared_task
def rebuild_content():
    source_dir = settings.SOURCE_DIR
    builder = content_manager.ContentManager()
    builder.build(source_dir)
