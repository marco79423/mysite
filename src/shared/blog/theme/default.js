const colorTable = {
  'cyan-50': '#E0F7FA',
  'cyan-600': '#00ACC1',
  'cyan-700': '#0097A7',
  'cyan-800': '#00838F',
  'cyan-900': '#006064',
  'cyan-A700': '#00B8D4',

  'grey-50': '#FAFAFA',
  'grey-200': '#EEEEEE',
  'grey-300': '#E0E0E0',
  'grey-600': '#757575',
  'grey-700': '#616161',
  'grey-900': '#212121'
}

export default {
  global: {
    fontColor: colorTable['grey-900'],
    link: {
      color: colorTable['cyan-700'],
      hoverColor: colorTable['cyan-900']
    }
  },
  page: {
    background: colorTable['grey-700'],
    header: {
      background: colorTable['cyan-600'],
      titleColor: colorTable['grey-50']
    },
    nav: {
      background: colorTable['cyan-800'],
      menu: {
        color: '#ECECEC',
        background: colorTable['cyan-800'],
        hoverBackground: colorTable['cyan-900'],
        dropdown: {
          background: colorTable['cyan-600'],
          borderColor: colorTable['cyan-800']
        }
      }
    },
    main: {
      background: colorTable['grey-200'],
      content: {
        article: {
          background: 'white',
          metadata: {
            tip: {
              color: '#FFFFFF',
              background: colorTable['cyan-600']
            }
          },
          header: {
            color: colorTable['grey-700']
          },
          block: {
            color: 'white',
            background: colorTable['cyan-600'],
            borderColor: '#ccc'
          },
          doctestBlock: {
            color: 'white',
            background: '#6D6D6D',
          },
          note: {
            background: '#ECECEC',
            titleColor: colorTable['cyan-800'],
            borderColor: '#ccc'
          },
          table: {
            header: {
              background: colorTable['cyan-600'],
            }
          }
        },
        pagination: {
          color: colorTable['grey-200'],
          background: colorTable['cyan-700'],
          hoverBackground: colorTable['cyan-900'],
          activeBackground: colorTable['cyan-900'],
        }
      },
      aside: {
        background: colorTable['grey-200'],
        darkerBackground: colorTable['grey-600'],

        section: {
          titleColor: colorTable['grey-700'],
          borderColor: colorTable['grey-200']
        }
      }
    },
    footer: {
      background: colorTable['cyan-800'],
      copyrightColor: '#ECECEC',
    }
  }
}