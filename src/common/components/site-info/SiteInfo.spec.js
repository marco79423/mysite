import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import SiteInfo from './SiteInfo'


test('It should render SiteInfo component correctly', () => {
  const props = Immutable.fromJS({
    version: 'master (3f5eb304b501ea2b5437ed6c4612bbc66077b7b8)',
    updatedTime: '2017-04-08 12:01:57.198000'
  })

  const component = renderer.create(
    <SiteInfo
      version={props.get('version')}
      updatedTime={props.get('updatedTime')}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})
