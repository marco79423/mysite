import * as React from 'react';

import Header from '../header';
import MainSection from '../main-section';
import Footer from '../footer';

import styles from './Base.css';


export default class Base extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                base
                <Header/>
                <MainSection/>
                <Footer/>
            </div>
        )
    }
}