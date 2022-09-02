import React from 'react'
import renderer from 'react-test-renderer'
import {ThemeProvider} from '@emotion/react'

import RstContent from './RstContent'
import theme from '../../../theme/default'

test('It should render RstContent component correctly', () => {
  const content = '<div>天氣不錯</div>'

  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <RstContent content={content}/>
    </ThemeProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
