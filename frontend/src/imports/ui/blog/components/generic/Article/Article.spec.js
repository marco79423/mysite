import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {MemoryRouter} from 'react-router'
import {ThemeProvider} from 'styled-components'

import Article from './Article'
import theme from '../../../theme/default'

test('It should render Article component correctly', () => {
  const article = {
    slug: 'slug',
    title: 'title',
    categories: [{
      slug: 'slug',
      name: 'name'
    }],
    date: new Date(2017, 6, 9),
    chickenCount: 1,
    content: 'content',
    rawSummary: 'raw_summary'
  }
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Article article={article}/>
      </MemoryRouter>
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
