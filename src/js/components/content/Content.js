import * as React from 'react';
import classNames from 'classnames';

import styles from './Content.css';


export default class Content extends React.Component {
    render() {
        return (
            <div className={classNames('pure-u-2-3', styles.root)}>
                content
            </div>
        )
    }
}
