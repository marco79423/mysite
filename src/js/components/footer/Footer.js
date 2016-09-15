import * as React from 'react';
import styles from './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <p>Copyright &copy; 2016 - 兩大類</p>
            </div>
        )
    }
}
