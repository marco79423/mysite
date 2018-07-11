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
            'is_attachment': self.is_attachment,
            'filename': self.filename,
            'data': self.data,
        }
