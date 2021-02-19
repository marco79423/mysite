import React from 'react'
import {connect} from 'react-redux'

import SiteHead from '../../components/generic/SiteHead'
import AppLayout from '../../components/layout/AppLayout'

import * as articleActions from '../../ducks/article/actions'
import * as siteSelectors from '../../ducks/site/selectors'
import * as configSelectors from '../../ducks/config/selectors'
import * as articleSelectors from '../../ducks/article/selectors'

export class AppLayoutContainer extends React.Component {

  componentWillMount() {
    // for recent articles
    if (this.props.recentArticles.length === 0) {
      this.props.fetchArticles()
    }
  }

  render() {
    const props = this.props
    return (
      <AppLayout {...props}>
        <SiteHead config={this.props.siteConfig}/>
        {this.props.children}
      </AppLayout>
    )
  }
}

export default connect(
  (state, props) => ({
    siteConfig: siteSelectors.getSiteHeadConfig(state, props),
    siteName: configSelectors.getSiteName(state, props),
    menuItems: configSelectors.getMenuItems(state, props),
    theme: configSelectors.getTheme(state, props),
    relatedSites: configSelectors.getRelatedSites(state, props),
    recentArticles: articleSelectors.getRecentArticles(state, props),
    crazyMode: state.lab.crazyMode,
    copyright: configSelectors.getCopyright(state, props),
  }),
  dispatch => ({
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  })
)(AppLayoutContainer)
