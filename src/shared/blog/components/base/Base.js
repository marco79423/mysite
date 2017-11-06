import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import classNames from 'classnames'

import 'normalize.css/normalize.css'
import styles from './Base.scss'

export default class Base extends React.Component {
  static PropTypes = {
    siteConfig: ImmutablePropTypes.map.isRequired,
    siteName: PropTypes.string.isRequired,
    menuItems: ImmutablePropTypes.contains({
      main: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ),
      extra: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      )
    }).isRequired,
    socialLinks: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ),
    recentArticles: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        slug: PropTypes.string,
        title: PropTypes.string
      })
    ),
    crazyMode: PropTypes.bool.isRequired,
    copyright: PropTypes.string
  }

  renderPageHeader = () => {
    return (
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>
          <Link to='/'><img src={require('../../img/logo.png')}/>{this.props.siteName}</Link>
        </h1>
        {this.props.crazyMode && <span className={classNames(styles.modeTitle, styles.intensifies)}>瘋狂模式</span>}
      </header>
    )
  }

  renderPageNav = () => {
    return (
      <nav className={styles.pageNav}>
        <div className={styles.menuContainer}>
          <a className={styles.menuToggle} href="#">選單</a>
          <ul className={styles.mainMenu}>
            {this.props.menuItems.get('main').map(item => (
              <li key={item.get('url')}><Link to={item.get('url')}>{item.get('name')}</Link></li>
            ))}
          </ul>
          <ul className={styles.extraMenu}>
            {this.props.menuItems.get('extra').map(item => (
              <li key={item.get('url')}><Link to={item.get('url')}>{item.get('name')}</Link></li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  renderPageMain = () => {
    return (
      <div className={styles.pageMain}>
        {this.props.children}
        {this.renderPageAside()}
      </div>
    )
  }

  renderPageAside = () => {
    return (
      <aside className={styles.aside}>
        {this.renderAboutMe()}
        {this.renderRecentArticles()}
        {this.renderAdditionalLinks()}
      </aside>
    )
  }

  renderAboutMe = () => {
    return (
      <section className={styles.aboutMe}>
        <img src={require('./img/me.jpg')} alt="兩大類"/>
        <div className={styles.profile}>
          <h3>兩大類</h3>
          <div className={styles.motto}>
            <div>能站著就別坐著，能走路就別騎車</div>
            <div>保持站起來的毅力和一步一腳印的耐心</div>
          </div>
          <ul className={styles.contact}>
            <li><a className={styles.facebook} href='https://www.facebook.com/marco79423'>facebook</a></li>
            <li><a className={styles.linkedin} href='https://www.linkedin.com/in/%E8%A2%81%E7%A2%A9-%E6%9D%8E-911604b5/'>GitHub</a></li>
            <li><a className={styles.github} href='https://github.com/marco79423'>LinkedIn</a></li>
          </ul>
        </div>
      </section>
    )
  }

  renderRecentArticles = () => {
    return (
      <section className={styles.recentArticles}>
        <h2>近期文章</h2>
        <ul>
          {
            this.props.recentArticles.map(article => (
              <li key={article.get('slug')}>
                <Link to={`/articles/${article.get('slug')}/`}>
                  {article.get('title')}
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    )
  }

  renderAdditionalLinks = () => {
    return (
      <section className={styles.additionalLinks}>
        <h2></h2>
        <ul>
          <li><Link to='/articles/archives/'>所有文章列表</Link></li>
        </ul>
      </section>
    )
  }

  renderPageFooter = () => {
    return (
      <footer className={styles.pageFooter}>
        <div className={styles.copyright}>Copyright © 2017 - 兩大類</div>
      </footer>
    )
  }

  render () {
    return (
      <div className={styles.container}>
        {this.renderPageHeader()}
        {this.renderPageNav()}
        {this.renderPageMain()}
        {this.renderPageFooter()}
      </div>
    )
  }
}
