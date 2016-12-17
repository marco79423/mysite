import * as React from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import Header from '../../components/header';
import Nav from '../../components/nav';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import styles from './Base.scss';


class Base extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.map.isRequired
  };

  render() {
    const {config} = this.props;
    return (
      <div className={styles.root}>
        <Header siteName={config.get('SITE_NAME')}/>
        <Nav leftMenuItems={config.get('LEFT_MENU_ITEMS')} rightMenuItems={config.get('RIGHT_MENU_ITEMS')}/>
        <div className={ classNames('pure-g', styles.mainSection) }>
          <div className='pure-u-2-3'>{this.props.children}</div>
          <div className='pure-u-1-3'><Sidebar aboutMeConfig={config.get('ABOUT_ME')}/></div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.get('config')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
