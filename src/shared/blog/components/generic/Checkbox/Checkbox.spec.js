import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {ThemeProvider} from 'styled-components'

import Checkbox from './Checkbox'
import theme from '../../../theme/default'

test('It should render Checkbox component in checked state correctly', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Checkbox checked={false} setChecked={() => null}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Checkbox component in checked state correctly', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Checkbox checked={true} setChecked={() => null}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
