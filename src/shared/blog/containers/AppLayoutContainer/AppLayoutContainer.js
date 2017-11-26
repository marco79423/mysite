import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SiteHead from '../../components/generic/SiteHead/index'
import AppLayout from '../../components/AppLayout/index'

import * as articleActions from '../../ducks/article/actions'
import * as siteSelectors from '../../ducks/site/selectors'
import * as configSelectors from '../../ducks/config/selectors'
import * as articleSelectors from '../../ducks/article/selectors'

@connect(
  (state, props) => ({
    siteConfig: siteSelectors.getSiteHeadConfig(state, props),
    siteName: configSelectors.getSiteName(state, props),
    menuItems: configSelectors.getMenuItems(state, props),
    recentArticles: articleSelectors.getRecentArticles(state, props),
    crazyMode: state.getIn(['lab', 'crazyMode']),
    copyright: configSelectors.getCopyright(state, props),
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)
export default class AppLayoutContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    siteName: PropTypes.string.isRequired,
    menuItems: ImmutablePropTypes.map.isRequired,
    copyright: PropTypes.string,
    recentArticles: PropTypes.array
  }

  componentWillMount () {
    // for recent articles
    if (this.props.recentArticles.isEmpty()) {
      this.props.fetchArticles()
    }
  }

  render () {
    const props = this.props
    return (
      <AppLayout {...props}>
        <SiteHead config={this.props.siteConfig}/>
        {this.props.children}
      </AppLayout>
    )
  }
}
