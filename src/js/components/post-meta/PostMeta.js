import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './PostMeta.scss';


export default class PostMeta extends React.Component {
    static PropTypes = {
        categories: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                slug: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired
            })
        ),
        author: React.PropTypes.string.isRequired,
        date: React.PropTypes.any.isRequired,
        modifiedDate: React.PropTypes.any
    };

    render() {
        const { categories, author, date, modifiedDate } = this.props;

        return (
            <div className={styles.root}>
                <span>分類：{ categories.map(category => (<div>{category.get('name')}</div>)) }</span>
                <span>作者：{ author }</span>
                <span>發表時間：{ date }</span>
                {modifiedDate && <span>最後更新：{ modifiedDate }</span>}
            </div>
        );
    }
}
