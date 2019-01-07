import React from 'react'
import renderer from 'react-test-renderer'

import Disqus from './Disqus'

test('It should render Disqus component correctly', () => {
  const component = renderer.create(
    <Disqus shortName={'marco79423'}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
