from imports.domains.base_types import Entity


class Asset(Entity):
    def __init__(self, uuid, is_attachment, filename, data):
        self.uuid = uuid
        self.is_attachment = is_attachment
        self.filename = filename
        self.data = data

    def serialize(self):
        return {
            'uuid': self.uuid,
            'isAttachment': self.is_attachment,
            'filename': self.filename,
            'data': self.data,
        }

    def __eq__(self, asset):
        return (
                self.uuid == asset.uuid and
                self.is_attachment == asset.is_attachment and
                self.filename == asset.filename and
                self.data == asset.data
        )
