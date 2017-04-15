import React from 'react'
import renderer from 'react-test-renderer'

import ArticleContent from './ArticleContent'


test('It should render ArticleContent component correctly', () => {
  const content = '<div>天氣不錯</div>'

  const component = renderer.create(
    <ArticleContent content={content}/>
  )
  expect(component.toJSON()).toMatchSnapshot()
})