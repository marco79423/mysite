import * as React from 'react';
import styles from './Header.css';

import logo from '../../img/logo.png';


export default class Header extends React.Component {
    render() {
        const siteName = '兩大類 x 兩大類 = 四大類';

        return (
            <div className={styles.root}>
                <img className={styles.logo} src={logo} alt={siteName} />
                <a href='/'>{siteName}</a>
            </div>
        )
    }
}