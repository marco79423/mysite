import * as React from 'react';

import Header from '../header';
import Nav from '../nav';
import MainSection from '../main-section';
import Footer from '../footer';

import styles from './Base.css';


export default class Base extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <Header/>
                <Nav/>
                <MainSection/>
                <Footer/>
            </div>
        )
    }
}
