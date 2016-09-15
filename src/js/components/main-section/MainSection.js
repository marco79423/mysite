import * as React from 'react';

import Content from '../content';
import Sidebar from '../sidebar';

import styles from './MainSection.css';

export default class MainSection extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <Content/>
                <Sidebar/>
            </div>
        )
    }
}
