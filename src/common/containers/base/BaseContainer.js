import * as React from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Base from '../../components/base'

import * as articleSelectors from '../../ducks/article/selectors'
import * as siteSelectors from '../../ducks/site/selectors'

class BaseContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    config: ImmutablePropTypes.map.isRequired,
    recentArticles: ImmutablePropTypes.list
  }

  render () {
    const {config, siteConfig, recentArticles} = this.props
    return (
      <Base
        siteConfig={siteConfig}
        config={config}
        recentArticles={recentArticles}>
        {this.props.children}
      </Base>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    config: state.get('config'),
    siteConfig: siteSelectors.getSiteHeadConfig(state, props),
    recentArticles: articleSelectors.getRecentArticles(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer)
