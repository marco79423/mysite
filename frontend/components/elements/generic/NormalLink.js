import React from 'react'
import {css, useTheme} from '@emotion/react'

import Link from './Link'


function NormalLink(props) {
  const theme = useTheme()
  const styles = {
    root: css`
      color: ${theme.global.link.color};
      text-decoration: none;

      &:hover {
        color: ${theme.global.link.hoverColor};
      }
    `
  }

  return (
    <Link css={styles.root} {...props}/>
  )
}

export default React.memo(NormalLink)
