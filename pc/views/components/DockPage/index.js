'use strict'
import React, { Component } from 'react';

import cube from './cube.png';
import styles from './styles.css';

class DockPage extends Component {
    dock() {
        const { canvas } = this.refs;
        const cxt = canvas.getContext('2d');
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        cxt.fillStyle = '#FFF';
        cxt.fillRect(0, 50, 40, 40);
        cxt.fillStyle = '#5ba55b';
        cxt.fillRect(42, 60, 20, 20);
        cxt.fillStyle = '#5b80a5';
        cxt.fillRect(64, 60, 20, 20);
        cxt.fillRect(64, 82, 20, 20);
        cxt.fillRect(64, 104, 20, 20);
        cxt.fillStyle = '#5ba58c';
        cxt.fillRect(86, 60, 20, 20);
        cxt.fillRect(86, 82, 20, 20);
        cxt.fillRect(86, 104, 20, 20);
        cxt.fillStyle = '#a5745b';
        cxt.fillRect(108, 82, 20, 20);
    }
    render() {
        return (
            <div className={styles.dock}>
                <div className={styles.result}>
                    <canvas ref='canvas'></canvas>
                </div>
                <div className={styles.controller}>
                    <button type='button' className='btn' onClick={this.dock.bind(this)}><img src={cube}/></button>
                </div>
            </div>
        )
    }
}

export default DockPage;
