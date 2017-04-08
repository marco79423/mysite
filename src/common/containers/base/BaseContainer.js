import * as React from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SiteHead from '../../components/site-head'
import Header from '../../components/header'
import Nav from '../../components/nav'
import Sidebar from '../../components/sidebar'
import Content from '../../components/content'
import Footer from '../../components/footer'

import * as articleSelectors from '../../ducks/article/selectors'
import * as siteSelectors from '../../ducks/site/selectors'

import 'normalize.css/normalize.css'
import styles from './BaseContainer.scss'

class BaseContainer extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    config: ImmutablePropTypes.map.isRequired,
    recentArticles: ImmutablePropTypes.list
  }

  render () {
    const {config, siteConfig, recentArticles} = this.props
    return (
      <div className={styles.root}>
        <SiteHead config={siteConfig}/>

        <div className={styles.header}>
          <Header siteName={config.get('SITE_NAME')}/>
        </div>
        <div className={styles.nav}>
          <Nav leftMenuItems={config.get('LEFT_MENU_ITEMS')} rightMenuItems={config.get('RIGHT_MENU_ITEMS')}/>
        </div>

        <div className={styles.main}>
          <div className={styles.sidebar}>
            <Sidebar aboutMeConfig={config.get('ABOUT_ME')} recentArticles={recentArticles}/>
          </div>
          <div className={styles.content}>
            <Content>
              {this.props.children}
            </Content>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer/>
        </div>
      </div>
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
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer)
