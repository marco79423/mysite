import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import AboutMeContainer from '../../containers/about-me'
import RecentArticlesContainer from '../../containers/recent-articles'

import SiteHead from '../site-head'
import Header from '../header'
import Nav from '../nav'
import Content from '../content'
import Footer from '../footer'

import 'normalize.css/normalize.css'
import styles from './Base.scss'

export default class Base extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    siteName: React.PropTypes.string.isRequired,
    menuItems: ImmutablePropTypes.map.isRequired,
    crazyMode: React.PropTypes.bool.isRequired,
    category: React.PropTypes.string
  }

  render () {
    const {siteConfig, menuItems, siteName, crazyMode, category} = this.props
    return (
      <div className={styles.root}>
        <SiteHead config={siteConfig}/>

        <div className={styles.header}>
          <Header siteName={siteName} crazyMode={crazyMode}/>
        </div>
        <div className={styles.nav}>
          <Nav menuItems={menuItems}/>
        </div>

        <div className={styles.main}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarInside}>
              <AboutMeContainer/>
              <div className={styles.otherPart}>
                <RecentArticlesContainer category={category}/>
                <div className={styles.archive}>
                  <Link className={styles.link} to='/articles/archives/'>所有文章列表</Link>
                </div>
              </div>
            </div>
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
