import * as React from 'react';
import range from 'lodash/range';
import classNames from 'classnames';

import Link from '../link';

import styles from './Pagination.scss';


export default class Pagination extends React.Component {
    static propTypes = {
        current: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        makeLink: React.PropTypes.func.isRequired
    };

    render() {
        const { current, max, makeLink } = this.props;

        const linkStyle = {
            color: 'white'
        };

        return (
            <div className={styles.root}>
                <div className={styles.pagination}>
                    { (current !== 1) &&
                        <span className={styles.link}>
                            <Link style={ linkStyle } to={makeLink(current - 1)}>←</Link>
                        </span>
                    }
                    { range(1, max + 1).map(pageNum =>
                        <span key={pageNum}
                              className={classNames(styles.link, {[styles.current]: pageNum === current})}>
                            {pageNum === current ?
                                pageNum :
                                <Link style={ linkStyle } to={makeLink(pageNum)}>{ pageNum }</Link>
                            }
                        </span>
                    )}
                    { (current <= max) &&
                        <span className={styles.link}>
                            <Link style={ linkStyle } to={makeLink(current + 1)}>→</Link>
                        </span>
                    }
                </div>
            </div>
        );
    }
}
