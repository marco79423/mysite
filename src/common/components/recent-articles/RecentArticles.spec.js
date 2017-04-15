import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import RecentArticles from './RecentArticles'

test('It should render RecentArticles component with empty articles correctly', () => {
  const articles = Immutable.fromJS([])

  const component = renderer.create(
    <RecentArticles articles={articles}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render RecentArticles component correctly', () => {
  const articles = Immutable.fromJS([
    {slug: 'slug 1', title: 'title 1'},
    {slug: 'slug 2', title: 'title 2'},
    {slug: 'slug 3', title: 'title 3'}
  ])

  const component = renderer.create(
    <RecentArticles articles={articles}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
