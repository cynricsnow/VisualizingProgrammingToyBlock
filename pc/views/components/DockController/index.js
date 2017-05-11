'use strict'
import React, { Component } from 'react';

import styles from './styles.css';

class DockController extends Component {
    render() {
        const { handleAssimilate, handleDock, handleUpdate } = this.props;
        return (
            <div className={styles.controller}>
                <button type='button' className='btn' onClick={handleAssimilate}><span className='glyphicon glyphicon-arrow-down'></span></button>
                <button type='button' className='btn' onClick={handleDock}><span className='glyphicon glyphicon-refresh'></span></button>
                <button type='button' className='btn' onClick={handleUpdate}><span className='glyphicon glyphicon-arrow-up'></span></button>
            </div>
        )
    }
}

export default DockController;
