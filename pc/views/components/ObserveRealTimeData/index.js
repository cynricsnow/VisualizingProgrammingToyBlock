'use stric'
import React, { Component } from 'react';

import styles from './styles';

class ObserveRealTimeData extends Component {
    render() {
        return (
            <div className={styles.content}>
                <p className={styles.result} ref='output'></p>
                <div className={styles.controller}>
                    <button type='button' className='btn' ref='run'><span className='glyphicon glyphicon-eye-open'></span></button>
                </div>
            </div>
        )
    }
}

export default ObserveRealTimeData;
