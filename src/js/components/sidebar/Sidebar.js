import * as React from 'react';

import AboutMe from '../about-me';
import RecentArticles from '../recent-articles';

import styles from './Sidebar.scss';


export default class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <AboutMe/>
        <RecentArticles/>
        <div className={styles.otherPart}>
          <div className={styles.link}>所有文章列表</div>
        </div>
      </div>
    );
  }
}
