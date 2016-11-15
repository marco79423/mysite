import * as React from 'react';

import styles from './Base.scss';


export default class Base extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                {this.props.children}
            </div>
        )
    }
}
