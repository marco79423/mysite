from docutils import nodes
from docutils.parsers.rst import directives, Directive

from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.lexers.special import TextLexer
from pygments.formatters.html import HtmlFormatter


class Pygments(Directive):
    """ Source code syntax hightlighting.
    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        'anchorlinenos': directives.flag,
        'classprefix': directives.unchanged,
        'hl_lines': directives.unchanged,
        'lineanchors': directives.unchanged,
        'linenos': directives.unchanged,
        'linenospecial': directives.nonnegative_int,
        'linenostart': directives.nonnegative_int,
        'linenostep': directives.nonnegative_int,
        'lineseparator': directives.unchanged,
        'linespans': directives.unchanged,
        'nobackground': directives.flag,
        'nowrap': directives.flag,
        'tagsfile': directives.unchanged,
        'tagurlformat': directives.unchanged,
    }
    has_content = True

    def run(self):
        self.assert_has_content()
        try:
            lexer = get_lexer_by_name(self.arguments[0])
        except ValueError:
            # no lexer found - use the text one instead of an exception
            lexer = TextLexer()

        if 'linenos' in self.options and self.options['linenos'] not in ('table', 'inline'):
            if self.options['linenos'] == 'none':
                self.options.pop('linenos')
            else:
                self.options['linenos'] = 'table'

        for flag in ('nowrap', 'nobackground', 'anchorlinenos'):
            if flag in self.options:
                self.options[flag] = True

        # noclasses should already default to False, but just in case...
        formatter = HtmlFormatter(noclasses=False, **self.options)
        parsed = highlight('\n'.join(self.content), lexer, formatter)
        return [nodes.raw('', parsed, format='html')]


def register():
    directives.register_directive('code-block', Pygments)
    directives.register_directive('sourcecode', Pygments)
