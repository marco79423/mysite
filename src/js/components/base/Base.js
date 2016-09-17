import * as React from 'react';

import styles from './Base.css';


export default class Base extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                {this.props.children}
            </div>
        )
    }
}
