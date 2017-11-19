import React from 'react'
import renderer from 'react-test-renderer'

import Checkbox from './Checkbox'

test('It should render Checkbox component in checked state correctly', () => {
  const component = renderer.create(
    <Checkbox checked={false} setChecked={() => null}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('It should render Checkbox component in checked state correctly', () => {
  const component = renderer.create(
    <Checkbox checked={true} setChecked={() => null}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
