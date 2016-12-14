import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Header from '../../components/header';
import Nav from '../../components/nav';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';
import * as configActions from '../../ducks/config/actions';

import styles from './Base.scss';


class Base extends React.Component {
    static PropTypes = {
        loadConfig: React.PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadConfig();
    }

    render() {
        return (
            <div className={styles.root}>
                <Header siteName={this.props.siteName} />
                <Nav/>
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
    return {
        siteName: state.getIn(['config', 'SITE_NAME'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadConfig: () => dispatch(configActions.loadConfig())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
