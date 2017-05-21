import React from 'react'
import renderer from 'react-test-renderer'

import Header from './Header'


test('It should render Header component correctly', () => {
  const siteName = 'Site Name'

  const component = renderer.create(
    <Header siteName={siteName}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Header component in crazyMode correctly', () => {
  const siteName = 'Site Name'

  const component = renderer.create(
    <Header siteName={siteName} crazyMode={true}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
