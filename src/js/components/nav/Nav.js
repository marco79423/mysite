import * as React from 'react';

import styles from './Nav.css';


export default class Nav extends React.Component {

    render() {
        const leftMenuItems = [
            'Python', '專案作品', '程式設計', 'UNIX & 工具', '胡言亂語'
        ];

        const rightMenuItems = [
            '閱讀計劃', '成功日記'
        ];

        return (
            <div className={styles.root}>
                <ul className={styles.left}>
                    {leftMenuItems.map(item => (<li><a href=''>{item}</a></li>))}
                </ul>
                <ul className={styles.root}>
                    {rightMenuItems.map(item => (<li><a href=''>{item}</a></li>))}
                </ul>
            </div>
        )
    }
}
