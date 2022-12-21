import React from 'react'
import {css} from '@emotion/react'

import NormalLink from './NormalLink'

function TitleLink(props) {
  return (
    <NormalLink css={css`
      font-size: 2rem;
    `} {...props}/>
  )
}

export default React.memo(TitleLink)
