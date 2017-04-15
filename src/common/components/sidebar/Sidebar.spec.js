import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import Sidebar from './Sidebar'


test('It should render Sidebar component correctly', () => {
  const props = Immutable.fromJS({
    aboutMeConfig: {
      socialLinks: [
        {name: 'A', url: 'URL 1'},
        {name: 'B', url: 'URL 2'}
      ],
      quote: '今天天氣不錯，希望明天會更好！'
    },
    recentArticles: [
      {slug: 'slug 1', title: 'title 1'},
      {slug: 'slug 2', title: 'title 2'},
      {slug: 'slug 3', title: 'title 3'}
    ]
  })

  const component = renderer.create(
    <Sidebar
      aboutMeConfig={props.get('aboutMeConfig')}
      recentArticles={props.get('recentArticles')}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})
