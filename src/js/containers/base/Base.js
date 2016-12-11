import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Header from '../../components/header';
import Nav from '../../components/nav';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

import styles from './Base.scss';


class Base extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <Header/>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
