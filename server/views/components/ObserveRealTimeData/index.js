'use stric'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { observe_getdata } from '../../redux/actions/observe';

import styles from './styles';

let intervalId = null;

@connect(
    state => ({
        realTimeData: state.observe.realTimeData,
        dest: state.dock.dest
    }),
    dispatch => ({
        getData() {
            const { glyphicon } = this.refs;
            if (intervalId) {
                clearTimeout(intervalId);
                glyphicon.className = 'glyphicon glyphicon-eye-open';
            } else {
                const { dest } = this.props;
                if (dest) {
                    intervalId = setInterval(() => {
                        observe_getdata(dispatch, dest);
                    }, 1000);
                    glyphicon.className = 'glyphicon glyphicon-eye-close';
                }
            }
        }
    })
)
class ObserveRealTimeData extends Component {
    render() {
        const { realTimeData, getData } = this.props;
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
                    <button type='button' className='btn' ref='run' onClick={getData.bind(this)}><span className='glyphicon glyphicon-eye-open' ref='glyphicon'></span></button>
                </div>
            </div>
        )
    }
}

export default ObserveRealTimeData;
