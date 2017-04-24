'use stric'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles';

@connect(
    state => ({
        temperatures: state.observe.temperatures,
        distances: state.observe.distances
    })
)
class ObserveRealTimeData extends Component {
    render() {
        const { temperatures, distances } = this.props;
        return (
            <div className={styles.content}>
                <div className={styles.result} ref='output'>
                    {
                        temperatures.map((value, index) => (
                            <p key={index}>温度探测器{index+1}:</p>
                        ))
                    }
                    {
                        distances.map((value, index) => (
                            <p key={index}>超声波探测器{index+1}:</p>
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
