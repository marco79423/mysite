import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import AboutMe from '../about-me';
import RecentArticles from '../recent-articles';

import styles from './Sidebar.scss';


export default class Sidebar extends React.Component {
  static PropTypes = {
    aboutMeConfig: ImmutablePropTypes.map.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <AboutMe config={this.props.aboutMeConfig}/>
        <RecentArticles/>
        <div className={styles.otherPart}>
          <div className={styles.link}>所有文章列表</div>
        </div>
      </div>
    );
  }
}
