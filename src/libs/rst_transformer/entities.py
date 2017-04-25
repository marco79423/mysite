class Entity:
    pass


class Resource(Entity):
    def __init__(self, original_url, file_path):
        self.original_url = original_url
        self.file_path = file_path

    @property
    def basename(self):
        return self.file_path.name


class Article(Entity):
    def __init__(self, title, tags, content, item_images, item_files):
        self.title = title
        self.tags = tags
        self.content = content
        self.item_images = item_images
        self.item_files = item_files

    @property
    def categories(self):
        return self.tags['categories']

    @property
    def series(self):
        return self.tags['series']

    @property
    def date(self):
        return self.tags['date']

    @property
    def modified_date(self):
        return self.tags['modified_date']
