import React from 'react'
import Footer from './Footer'
import renderer from 'react-test-renderer'


test('It should render Footer component correctly', () => {
  const copyright = 'Copyright © 2017 - 兩大類'

  const component = renderer.create(
    <Footer copyright={copyright}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})