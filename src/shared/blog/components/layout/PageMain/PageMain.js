import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import PageAside from './PageAside'

const Base = styled.header`
  background: #ECECEC;
  overflow: auto;
`

export default class PageMain extends React.Component {
  static PropTypes = {
    recentArticles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string
      })
    ),
    content: PropTypes.element.isRequired
  }

  render () {
    return (
      <Base>
        {this.props.content}
        <PageAside recentArticles={this.props.recentArticles}/>
      </Base>
    )
  }
}
