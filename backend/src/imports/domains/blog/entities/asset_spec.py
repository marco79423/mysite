from imports.domains.blog.entities.asset import Asset


def test_serialize_asset():
    category = Asset(
        uuid='uuid',
        is_attachment='is_attachment',
        filename='filename',
        data='data',
    )

    assert category.serialize() == {
        'uuid': 'uuid',
        'isAttachment': 'is_attachment',
        'filename': 'filename',
        'data': 'data',
    }
