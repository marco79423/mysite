import * as React from 'react';
import styles from './Header.scss';


export default class Header extends React.Component {
    render() {
        const siteName = '兩大類 x 兩大類 = 四大類';

        return (
            <div className={styles.root}>
                <div className={styles.logo} />
                <div className={styles.title}>{siteName}</div>
            </div>
        )
    }
}