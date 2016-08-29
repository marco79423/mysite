import * as Immutable from 'immutable';
import * as React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import { addValue } from '../../ducks/main';

import styles from './style.css';


export default class Counter extends React.Component {
    render() {
        const { value, onClicked } = this.props;
        return (
            <div className={styles.root} onClick={onClicked}>
                value: {value}
            </div>
        )
    }
}