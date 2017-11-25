import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import RstContent from './RstContent'


test('It should render RstContent component correctly', () => {
  const content = '<div>天氣不錯</div>'

  const component = renderer.create(
    <RstContent content={content}/>
  )
  expect(component.toJSON()).toMatchSnapshot()
})