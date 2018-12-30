from imports.domains.blog.entities.asset import Asset


def test_serialize_asset():
    asset = Asset(
        uuid='uuid',
        is_attachment='is_attachment',
        filename='filename',
        data='data',
    )

    assert asset.serialize() == {
        'uuid': 'uuid',
        'isAttachment': 'is_attachment',
        'filename': 'filename',
        'data': 'data',
    }


def test_equal():
    asset = Asset(
        uuid='uuid',
        is_attachment='is_attachment',
        filename='filename',
        data='data',
    )

    assert asset == Asset(
        uuid='uuid',
        is_attachment='is_attachment',
        filename='filename',
        data='data',
    )
