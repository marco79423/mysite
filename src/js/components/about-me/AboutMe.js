import * as React from 'react';

import styles from './AboutMe.css';
import marcoImg from './img/marco.jpg';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <table>
                    <tr>
                        <td><img src={marcoImg} alt='兩大類'/></td>
                        <td>我是一隻<em>兩大類</em>
                        <div id="social">
                            <a href='https://github.com/marco79423'>GitHub</a>&nbsp|&nbsp
                            <a href='https://bitbucket.org/marco79423'>Bitbucket</a>&nbsp|&nbsp
                            <a href='https://www.facebook.com/marco79423'>facebook</a>
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            <blockquote>能站著就別坐著，能走路就別騎車<br/>保持站起來的毅力和一步一腳印的耐心。</blockquote>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}
