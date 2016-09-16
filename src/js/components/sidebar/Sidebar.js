import * as React from 'react';
import classNames from 'classnames';

import AboutMe from '../about-me';

import styles from './Sidebar.css';


export default class Sidebar extends React.Component {
    render() {
        const articles = [
            '筆記 - 資料視覺化之理論 - 2016/04/4',
            '小喵的故事3 - 天堂篇 - 2016/02/24',
            '高中生活點滴 - 2015/11/23'
        ];

        return (
            <div className={classNames('pure-u-1-3', styles.root)}>
                <AboutMe/>
                <section>
                    <div>最新文章</div>
                    <div className="hr"></div>
                    { articles.map((article, i) => (
                        <div key={i}>{article}</div>
                    ))}
                    <div></div>
                    <div>
                        <a href='/'>所有文章列表</a>
                    </div>
                </section>
        </div>
        )
    }
}
