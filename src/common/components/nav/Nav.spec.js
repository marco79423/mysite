import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import Nav from './Nav'

test('It should render Nav component correctly', () => {
  const props = Immutable.fromJS({
    menuItems: {
      left: [
        {url: 'url 1', name: 'name 1'},
        {url: 'url 2', name: 'name 2'},
        {url: 'url 3', name: 'name 3'},
      ],
      right: [
        {url: 'url 4', name: 'name 4'},
        {url: 'url 5', name: 'name 5'},
        {url: 'url 6', name: 'name 6'},
      ]
    }
  })

  const component = renderer.create(
    <Nav menuItems={props.get('menuItems')}/>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})