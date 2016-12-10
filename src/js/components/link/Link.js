import * as React from 'react';
import { Link } from 'react-router';

import styles from './Link.scss';

export default class _Link extends React.Component {
    render() {
        return (
            <Link className={styles.root} {...this.props}/>
        );
    }
}
