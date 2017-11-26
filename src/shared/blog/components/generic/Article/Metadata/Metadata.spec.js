import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Metadata from './Metadata'

test('It should render Metadata component correctly', () => {
  const categories = Immutable.fromJS([{
    slug: 'slug',
    name: 'name'
  },
  {
    slug: 'slug2',
    name: 'name2'
  }])
  const date = new Date(2017, 6, 9)

  const component = renderer.create(
    <Metadata categories={categories} date={date} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Metadata component correctly when target article has been modified', () => {
  const categories = Immutable.fromJS([{
    slug: 'slug',
    name: 'name'
  }])
  const date = new Date(2017, 6, 9)
  const modifiedDate = new Date(2017, 10, 9)

  const component = renderer.create(
    <Metadata categories={categories} date={date} modifiedDate={modifiedDate} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
