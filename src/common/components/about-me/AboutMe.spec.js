import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import AboutMe from './AboutMe'


test('It should render AboutMe component correctly', () => {
  const config = Immutable.fromJS({
    socialLinks: [
      {name: 'A', url: 'URL 1'},
      {name: 'B', url: 'URL 2'}
    ],
    quote: '今天天氣不錯，希望明天會更好！'
  })

  const component = renderer.create(
    <AboutMe config={config}/>
  )
  expect(component.toJSON()).toMatchSnapshot()
})