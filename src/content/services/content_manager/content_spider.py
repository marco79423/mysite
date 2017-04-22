from content.services.content_manager import source_parsers


class Item:

    def __init__(self, item_data):
        self._item_data = item_data

    @property
    def title(self):
        return self._item_data['title']

    @property
    def categories(self):
        return self._item_data['tags']['categories']

    @property
    def series(self):
        return self._item_data['tags']['series']

    @property
    def date(self):
        return self._item_data['tags']['date']

    @property
    def modified_date(self):
        return self._item_data['tags']['modified_date']

    @property
    def item_images(self):
        return self._item_data['item_images']

    @property
    def item_files(self):
        return self._item_data['item_files']

    @property
    def content(self):
        return self._item_data['content']

    def to_json(self):
        return {
            'title': self.title,
            'series': self.series,
            'categories': self.categories,
            'date': self.date,
            'modified_date': self.modified_date,
            'item_images': self.item_images,
        }


class ContentSpider:

    PARSERS = [source_parsers.RstParser]

    def __init__(self):
        self._parsers = [parser() for parser in self.PARSERS]

    def parse(self, base_dir):
        items = []
        for item_dir in base_dir.dirs():
            parser = self._get_suitable_parser(item_dir)
            items.append(Item(parser.parse(item_dir)))
        return items

    def _get_suitable_parser(self, file_path):
        for parser in self._parsers:
            if parser.match(file_path):
                return parser
        return None
