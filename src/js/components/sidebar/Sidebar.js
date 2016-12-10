import * as React from 'react';

import AboutMe from '../about-me';
import RecentArticles from '../recent-articles';

import styles from './Sidebar.scss';


export default class Sidebar extends React.Component {
    render() {
        const articles = [
            '筆記 - 資料視覺化之理論 - 2016/04/4',
            '小喵的故事3 - 天堂篇 - 2016/02/24',
            '高中生活點滴 - 2015/11/23'
        ];

        return (
            <div className={styles.root}>
                <AboutMe/>
                <RecentArticles/>
                <div className={styles.otherPart}>
                    <div className={styles.link}>所有文章列表</div>
                </div>
            </div>
        )
    }
}
