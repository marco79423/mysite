import React from 'react'
import renderer from 'react-test-renderer'
import {ThemeProvider} from '@emotion/react'

import theme from '../../../theme/default'
import Loading from './Loading'

test('It should render Loading component correctly', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Loading/>
    </ThemeProvider>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
