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
                <div className={styles.leftMenu}>
                    {leftMenuItems.map((item, i) => (<div key={i} className={styles.menuItem}>{item}</div>))}
                </div>
                <div className={styles.rightMenu}>
                    {rightMenuItems.map((item, i) => (<div key={i} className={styles.menuItem}>{item}</div>))}
                </div>
            </div>
        )
    }
}
