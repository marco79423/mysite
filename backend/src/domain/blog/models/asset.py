from domain import base_types


class Asset(base_types.Entity):
    def __init__(self, filename, data):
        self.filename = filename
        self.data = data
