import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import Page from '../../components/page'

import * as pageActions from '../../ducks/page/actions'

export class PageContainer extends React.Component {
  static PropTypes = {
    page: ImmutablePropTypes.contains({
      app: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.content
    }).isRequired,

    fetchPages: React.PropTypes.func.isRequired
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
