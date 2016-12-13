import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import styles from './ArticleMeta.scss';


export default class ArticleMeta extends React.Component {
    static PropTypes = {
        categories: ImmutablePropTypes.list,
        date: React.PropTypes.any.isRequired,
        modifiedDate: React.PropTypes.any
    };

    render() {
        const { categories, date, modifiedDate } = this.props;

        return (
            <div className={styles.root}>
                <span className={styles.field}>
                    分類：{ categories.map(category => (
                        <Link key={category.get('slug')}
                              className={styles.category}
                              to={`/articles/category/${category.get('slug')}/`}>{category.get('name')}</Link>
                    )) }
                </span>
                <span className={styles.field}>
                    作者：兩大類
                </span>
                <span className={styles.field}>
                    發表時間：{ date.format('YYYY/MM/DD') }
                </span>
                {modifiedDate &&
                    <span className={styles.field}>
                        最後更新：{ modifiedDate.format('YYYY/MM/DD') }
                    </span>
                }
            </div>
        );
    }
}
