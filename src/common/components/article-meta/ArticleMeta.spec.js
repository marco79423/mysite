import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import ArticleMeta from './ArticleMeta'


test('It should render ArticleMeta component without modifiedDate correctly', () => {
  const props = Immutable.fromJS({
    categories: [
      {slug: 'slug 1', name: 'category 1'}
    ],
    date: new Date(2017, 4, 15),
    modifiedDate: null
  })

  const component = renderer.create(
    <ArticleMeta
      categories={props.get('categories')}
      date={props.get('date')}
      modifiedDate={props.get('modifiedDate')}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('It should render ArticleMeta component with multiple categories correctly', () => {
  const props = Immutable.fromJS({
    categories: [
      {slug: 'slug 1', name: 'category 1'},
      {slug: 'slug 2', name: 'category 2'}
    ],
    date: new Date(2017, 4, 15),
    modifiedDate: null
  })

  const component = renderer.create(
    <ArticleMeta
      categories={props.get('categories')}
      date={props.get('date')}
      modifiedDate={props.get('modifiedDate')}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})


test('It should render ArticleMeta component correctly', () => {
  const props = Immutable.fromJS({
    categories: [
      {slug: 'slug 1', name: 'category 1'},
      {slug: 'slug 2', name: 'category 2'}
    ],
    date: new Date(2017, 4, 15),
    modifiedDate: new Date(2017, 4, 16)
  })

  const component = renderer.create(
    <ArticleMeta
      categories={props.get('categories')}
      date={props.get('date')}
      modifiedDate={props.get('modifiedDate')}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})
