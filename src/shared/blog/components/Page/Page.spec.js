import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Page from './Page'

test('It should render Page component with empty articles correctly', () => {
  const page = null

  const component = renderer.create(
    <Page page={page}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Page component correctly', () => {
  const page = Immutable.fromJS({
    app: 'app',
    slug: 'slug',
    title: 'title',
    content: '<div>今天天氣不錯</div>'
  })

  const component = renderer.create(
    <Page page={page}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
