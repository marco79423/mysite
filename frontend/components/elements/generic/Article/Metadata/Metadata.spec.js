import React from 'react'
import renderer from 'react-test-renderer'
import {ThemeProvider} from '@emotion/react'

import Metadata from './Metadata'
import theme from '../../../../theme/default'

test('It should render Metadata component correctly', () => {
  const categories = [
    {
      slug: 'slug',
      name: 'name'
    },
    {
      slug: 'slug2',
      name: 'name2'
    }
  ]
  const date = new Date(2017, 6, 9)
  const chickenCount = 1

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Metadata categories={categories} chickenCount={chickenCount} date={date}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Metadata component correctly when target article has been modified', () => {
  const categories = [{
    slug: 'slug',
    name: 'name'
  }]
  const chickenCount = 1
  const date = new Date(2017, 6, 9)
  const modifiedDate = new Date(2017, 10, 9)

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Metadata categories={categories} chickenCount={chickenCount} date={date} modifiedDate={modifiedDate}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
