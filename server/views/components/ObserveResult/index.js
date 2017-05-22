'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hide } from '../../redux/actions/dock';
import ObservePanel from '../ObservePanel';
import ObserveWorld from '../ObserveWorld';
import styles from './styles.css';

@connect(
    state => ({
        dimension: state.observe.dimension
    }),
    dispatch => ({
        hideButton() {
            dispatch(hide());
        }
    })
)
class ObserveResult extends Component {
    componentDidMount() {
        const { hideButton } = this.props;
        hideButton();
    }
    render() {
        const { dimension } = this.props;
        return (
            <div className={styles.content}>
                {
                    dimension ? <ObserveWorld /> : <ObservePanel />
                }
            </div>
        )
    }
}

export default ObserveResult;
