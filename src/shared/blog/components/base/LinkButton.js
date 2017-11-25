import styled from 'styled-components'
import Link from '../../../generic/components/Link'

export default styled(Link)`
  color: #ECECEC;
  background: ${props => props.active ? '#065a76' : '#388ca8'};
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  &:hover {
    background: #065a76;
  }
`
