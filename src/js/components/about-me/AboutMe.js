import * as React from 'react';

import styles from './AboutMe.css';
import marcoImg from './img/marco.jpg';

export default class Sidebar extends React.Component {
    render() {

        const socialLinks = [
            {name: 'GitHub', url: 'https://github.com/marco79423'},
            {name: 'Bitbucket', url: 'https://bitbucket.org/marco79423'},
            {name: 'facebook', url: 'https://www.facebook.com/marco79423'}
        ];

        const quote = '能站著就別坐著，能走路就別騎車\n保持站起來的毅力和一步一腳印的耐心';

        return (
            <div className={styles.root}>
                <div className={styles.profile}>
                    <div className={styles.author}></div>
                    <div className={styles.info}>
                        <div>我是一隻<em>兩大類</em></div>
                        <div>
                            {socialLinks.map(link => (<div key={link.name} className={styles.socialLink}>{link.name}</div>))}
                        </div>
                    </div>
                </div>
                <div className={styles.quote}>
                    {quote}
                </div>
            </div>
        )
    }
}
