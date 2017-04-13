import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import AboutMe from '../about-me'
import RecentArticles from '../recent-articles'

import styles from './Sidebar.scss'

export default class Sidebar extends React.PureComponent {
  static PropTypes = {
    aboutMeConfig: ImmutablePropTypes.map.isRequired,
    recentArticles: ImmutablePropTypes.list
  }

  render () {
    return (
      <div className={styles.root}>
        <AboutMe config={this.props.aboutMeConfig}/>
        <div className={styles.otherPart}>
          <RecentArticles articles={this.props.recentArticles}/>
          <div className={styles.archive}>
            <Link className={styles.link} to='/articles/archives/'>所有文章列表</Link>
          </div>
        </div>
      </div>
    )
  }
}
