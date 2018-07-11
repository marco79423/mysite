from imports.domains.blog.entities.category import Category


def test_serialize_category():
    category = Category(
        slug='slug',
        name='name',
    )

    assert category.serialize() == {
        'slug': 'slug',
        'name': 'name',
    }
