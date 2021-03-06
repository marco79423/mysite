import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {ThemeProvider} from 'styled-components'
import {MemoryRouter} from 'react-router'

import SiteInfo from './SiteInfo'
import theme from '../../../theme/default'


test('It should render SiteInfo component correctly', () => {
  const props = {
    repositoryVersion: 'develop (81ccde3550325c06a10b6acce75b4df529955472)',
    updatedTime: '2017-04-08 12:01:57.198000'
  }

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <SiteInfo
          repositoryVersion={props.repositoryVersion}
          updatedTime={props.updatedTime}
        />
      </MemoryRouter>
    </ThemeProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
