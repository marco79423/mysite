import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import Page from '../../components/page'

import * as pageActions from '../../ducks/page/actions'

export class PageContainer extends React.Component {
  static PropTypes = {
    page: ImmutablePropTypes.contains({
      app: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.content
    }).isRequired,

    fetchPages: PropTypes.func.isRequired
  }

  componentWillMount () {
    if (!this.props.page) {
      this.props.fetchPages()
    }
  }

  render () {
    return (
      <Page page={this.props.page}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.getIn(['page', 'items']).find(page => (
      page.get('app') === ownProps.params.app &&
      page.get('slug') === ownProps.params.slug
    ))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPages: () => dispatch(pageActions.fetchPages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
