'use stric'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { observe_getdata } from '../../redux/actions/observe';

import styles from './styles';

@connect(
    state => ({
        realTimeData: state.observe.realTimeData
    }),
    dispatch => ({
        getData() {
            dispatch(observe_getdata());
        }
    })
)
class ObserveRealTimeData extends Component {
    render() {
        const { realTimeData } = this.props;
        return (
            <div className={styles.content}>
                <div className={styles.result} ref='output'>
                    {
                        realTimeData.map((item, index) => (
                            <p key={index}>{item.type}传感器:{item.value}</p>
                        ))
                    }
                </div>
                <div className={styles.controller}>
                    <button type='button' className='btn' ref='run'><span className='glyphicon glyphicon-eye-open'></span></button>
                </div>
            </div>
        )
    }
}

export default ObserveRealTimeData;
