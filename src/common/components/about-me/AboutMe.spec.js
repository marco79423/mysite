import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import AboutMe from './AboutMe'

test('It should render AboutMe component correctly', () => {
  const socialLinks = Immutable.fromJS([
    {name: 'A', url: 'URL 1'},
    {name: 'B', url: 'URL 2'}
  ])
  const quote = '今天天氣不錯，希望明天會更好！'

  const component = renderer.create(
    <AboutMe socialLinks={socialLinks} quote={quote}/>
  )
  expect(component.toJSON()).toMatchSnapshot()
})