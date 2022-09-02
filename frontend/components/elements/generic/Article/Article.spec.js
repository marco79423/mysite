import React from 'react'
import renderer from 'react-test-renderer'
import {ThemeProvider} from '@emotion/react'

import Article from './Article'
import theme from '../../../theme/default'

test('It should render Article component correctly', () => {
  const article = {
    slug: 'slug',
    path: '/articles/slug',
    url: 'host://host/articles/slug',
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
      <Article article={article}/>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
