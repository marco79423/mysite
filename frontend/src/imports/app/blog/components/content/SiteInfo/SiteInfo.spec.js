import Immutable from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {ThemeProvider} from 'styled-components'

import SiteInfo from './SiteInfo'
import theme from '../../../theme/default'


test('It should render SiteInfo component correctly', () => {
  const props = Immutable.fromJS({
    frontendVersion: 'master (3f5eb304b501ea2b5437ed6c4612bbc66077b7b8)',
    backendVersion: 'develop (81ccde3550325c06a10b6acce75b4df529955472)',
    updatedTime: '2017-04-08 12:01:57.198000'
  })

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <SiteInfo
        frontendVersion={props.frontendVersion}
        backendVersion={props.backendVersion}
        updatedTime={props.updatedTime}
      />
    </ThemeProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
