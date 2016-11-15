import * as React from 'react';

import styles from './RecentPosts.scss';


export default class RecentPosts extends React.Component {
    render() {
        const articles = [
            '筆記 - 資料視覺化之理論 - 2016/04/4',
            '小喵的故事3 - 天堂篇 - 2016/02/24',
            '高中生活點滴 - 2015/11/23'
        ];

        return (
            <div className={styles.root}>
                <div className={styles.title}>最新文章</div>
                <div className={styles.hr} />
                <div className={styles.posts}>
                    { articles.map((article, i) => (
                        <div className={styles.post} key={i}>{article}</div>
                    ))}
                </div>
                <div className={styles.hr} />
            </div>
        )
    }
}
