import styled from 'styled-components'
import NormalLink from '../../../generic/components/Link'

export default styled(NormalLink)`
  color: ${props => props.theme.global.link.color};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.global.link.hoverColor};
  }
`
