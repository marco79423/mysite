import React from 'react'
import styled from 'styled-components'
import NormalLink from './NormalLink'

export default styled(({active, ...rest}) => <NormalLink {...rest} />)`
  color: #ECECEC;
  background: ${props => props.active ? '#065a76' : '#388ca8'};
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  &:hover {
    background: #065a76;
  }
`
