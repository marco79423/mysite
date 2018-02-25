import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {ThemeProvider} from 'styled-components'

import Article from './Article'
import theme from '../../../theme/default'

test('It should render Article component correctly', () => {
  const article = Immutable.fromJS({
    slug: 'slug',
    title: 'title',
    categories: [{
      slug: 'slug',
      name: 'name'
    }],
    date: new Date(2017, 6, 9),
    content: 'content',
    rawSummary: 'raw_summary'
  })
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Article article={article}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Article component correctly when the article is null', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Article article={null}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
