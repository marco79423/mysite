import * as React from 'react';
import classNames from 'classnames';

import Content from '../content';
import Sidebar from '../sidebar';

import styles from './MainSection.css';

export default class MainSection extends React.Component {
    render() {
        return (
            <div className={classNames('pure-g', styles.root)}>
                <div className='pure-u-2-3'>
                    <Content/>
                </div>
                <div className='pure-u-1-3'>
                    <Sidebar/>
                </div>
            </div>
        )
    }
}
