import styled from '@emotion/styled'
import NormalLink from './Link'

export default styled(NormalLink)`
  color: ${props => props.theme.global.link.color};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.global.link.hoverColor};
  }
`
