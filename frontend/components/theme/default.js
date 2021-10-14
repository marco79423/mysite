const colorTable = {
  'cyan-50': '#E0F7FA',
  'cyan-600': '#00ACC1',
  'cyan-700': '#0097A7',
  'cyan-800': '#00838F',
  'cyan-900': '#006064',
  'cyan-A700': '#00B8D4',

  'teal-50': '#E0F2F1',
  'teal-100': '#B2DFDB',
  'teal-200': '#80CBC4',
  'teal-300': '#4DB6AC',
  'teal-400': '#26A69A',
  'teal-500': '#009688',
  'teal-600': '#00897B',
  'teal-700': '#00796B',
  'teal-800': '#00695C',
  'teal-900': '#004D40',
  'teal-A700': '#00BFA5',

  'grey-50': '#FAFAFA',
  'grey-200': '#EEEEEE',
  'grey-300': '#E0E0E0',
  'grey-600': '#757575',
  'grey-700': '#616161',
  'grey-900': '#212121'
}

const theme = {
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
      background: colorTable['teal-400'],
      titleColor: colorTable['grey-50']
    },
    nav: {
      background: colorTable['teal-600'],
      menu: {
        color: '#ECECEC',
        background: colorTable['teal-600'],
        hoverBackground: colorTable['cyan-900'],
        dropdown: {
          background: colorTable['teal-600'],
          borderColor: colorTable['teal-800']
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
              background: colorTable['teal-600']
            }
          },
          header: {
            color: colorTable['grey-700']
          },
          block: {
            color: 'white',
            background: colorTable['teal-600'],
            borderColor: '#ccc'
          },
          doctestBlock: {
            color: 'white',
            background: '#6D6D6D',
          },
          note: {
            background: '#ECECEC',
            titleColor: colorTable['teal-800'],
            borderColor: '#ccc'
          },
          table: {
            header: {
              background: colorTable['teal-600'],
            }
          }
        },
        pagination: {
          color: colorTable['grey-200'],
          background: colorTable['teal-700'],
          hoverBackground: colorTable['teal-900'],
          activeBackground: colorTable['teal-900'],
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
      background: colorTable['teal-600'],
      copyrightColor: '#ECECEC',
    }
  }
}

export default theme
