from imports.domains.blog.entities.web_page import WebPage


def test_serialize_web_page():
    web_page = WebPage(
        app='app',
        slug='slug',
        title='title',
        content='content',
    )
    assert web_page.serialize() == {
        'app': 'app',
        'slug': 'slug',
        'title': 'title',
        'content': 'content',
    }
