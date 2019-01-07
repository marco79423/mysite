import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {ThemeProvider} from 'styled-components'

import Archives from './Archives'
import theme from '../../../theme/default'

test('It should render Archives component with empty articles correctly', () => {
  const articles = Immutable.fromJS([])

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Archives articles={articles}/>
    </ThemeProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('It should render Archives component correctly', () => {
  const articles = Immutable.fromJS([
    {slug: 'slug 1', title: 'title 1', date: new Date(2017, 4, 15)},
    {slug: 'slug 2', title: 'title 2', date: new Date(2017, 4, 16)},
    {slug: 'slug 3', title: 'title 3', date: new Date(2017, 4, 17)}
  ])

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Archives articles={articles}/>
    </ThemeProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
