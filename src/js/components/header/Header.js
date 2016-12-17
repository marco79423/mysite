import * as React from 'react';
import {Link} from 'react-router';

import styles from './Header.scss';


export default class Header extends React.Component {
  static PropTypes = {
    siteName: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.logo}/>
        <div className={styles.title}><Link className={styles.link} to='/'>{this.props.siteName}</Link></div>
      </div>
    );
  }
}
