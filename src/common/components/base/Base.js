import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SiteHead from '../site-head'
import Header from '../header'
import Nav from '../nav'
import Sidebar from '../sidebar'
import Content from '../content'
import Footer from '../footer'

import 'normalize.css/normalize.css'
import styles from './Base.scss'

export default class Base extends React.PureComponent {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    config: ImmutablePropTypes.map.isRequired,
    recentArticles: ImmutablePropTypes.list.isRequired
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
