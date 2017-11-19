import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import ArticleComment from './Comment'

test('It should render ArticleComment component correctly', () => {
  const config = Immutable.Map({
    shortName: 'marco79423'
  })
  const component = renderer.create(
    <ArticleComment config={config}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should not crash when config is null', () => {
  const component = renderer.create(
    <ArticleComment config={null}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
