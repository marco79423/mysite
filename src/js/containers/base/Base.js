import * as React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import Header from '../../components/header';
import Nav from '../../components/nav';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';
import * as configActions from '../../ducks/config/actions';

import styles from './Base.scss';


class Base extends React.Component {
    static PropTypes = {
        siteName: React.PropTypes.string.isRequired,
        leftMenuItems: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                url: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired
            })
        ),
        rightMenuItems: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                url: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired
            })
        ),
        loadConfig: React.PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadConfig();
    }

    render() {
        return (
            <div className={styles.root}>
                <Header siteName={this.props.siteName} />
                <Nav leftMenuItems={this.props.leftMenuItems} rightMenuItems={this.props.rightMenuItems}/>
                <div className={ classNames('pure-g', styles.mainSection) }>
                    <div className='pure-u-2-3'>
                        {this.props.children}
                    </div>
                    <div className='pure-u-1-3'>
                        <Sidebar/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const config = state.get('config');
    return {
        siteName: config.get('SITE_NAME'),
        leftMenuItems: config.get('LEFT_MENU_ITEMS'),
        rightMenuItems: config.get('RIGHT_MENU_ITEMS')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadConfig: () => dispatch(configActions.loadConfig())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
