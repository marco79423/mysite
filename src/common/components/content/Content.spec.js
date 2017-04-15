import React from 'react'
import renderer from 'react-test-renderer'

import Content from './Content'


test('It should render Content component correctly', () => {
  const component = renderer.create(
    <Content>
      <div>今天天氣不錯</div>
    </Content>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
