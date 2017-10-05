import slugify
from pelican import utils as pelican_utils


def convert_to_slug(string):
    return slugify.slugify(string)


def truncate_html_words(html, max_length=15):
    return pelican_utils.truncate_html_words(html, max_length)
