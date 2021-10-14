import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import styled from 'styled-components'
import NormalLink from '../../../generic/NormalLink'

const PageButtonGroup = styled.ul`
  margin: 0 auto;
  float: right;

  @media (max-width: 1200px) {
    float: none;
  }

  li {
    float: left;
    margin-bottom: 32px;
    width: 32px;
    height: 32px;

    @media (max-width: 1200px) {
      margin-bottom: 0;
      width: calc(100% / 8);
    }
  }
`

const PageButton = styled(NormalLink)`
  display: block;
  text-align: center;
  line-height: 32px;
  font-size: 1.5rem;
  color: ${props => props.theme.page.main.content.pagination.color};
  background: ${props => props.active ? props.theme.page.main.content.pagination.activeBackground : props.theme.page.main.content.pagination.background};
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  &:hover {
    background: ${props => props.theme.page.main.content.pagination.hoverBackground};
  }
`

export default class Pagination extends React.PureComponent {
  static propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    makeLink: PropTypes.func.isRequired
  }

  render() {
    const {current, max, makeLink} = this.props

    return (
      <div>
        <PageButtonGroup>
          {(current !== 1) && <li><PageButton href={makeLink(current - 1)}>←</PageButton></li>}
          {
            range(1, max + 1).map(pageNum =>
              <li key={pageNum}>
                <PageButton active={pageNum === current} href={makeLink(pageNum)}><span>{pageNum}</span></PageButton>
              </li>
            )
          }
          {(current < max) && <li><PageButton href={makeLink(current + 1)}>→</PageButton></li>}
        </PageButtonGroup>
      </div>
    )
  }
}
