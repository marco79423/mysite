from __future__ import unicode_literals

from django.templatetags.static import static

from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
from docutils.parsers.rst.roles import set_classes
from slugify import slugify


class SiteImage(Directive):

    def source(argument):
        return static("images/" + slugify(argument) + "/")

    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        'alt': directives.unchanged,
        'height': directives.length_or_unitless,
        'width': directives.length_or_percentage_or_unitless,
        'scale': directives.percentage,
        'source': source,
    }

    def run(self):
        source = self.options.pop('source')
        self.options['uri'] = source + self.arguments[0].strip()
        set_classes(self.options)
        image_node = nodes.image(self.block_text, **self.options)
        self.add_name(image_node)
        return [image_node]


def register():
    directives.register_directive('site-image', SiteImage)
