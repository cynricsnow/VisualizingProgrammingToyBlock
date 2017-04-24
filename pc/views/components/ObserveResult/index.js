'use strict'
import React, { Component } from 'react';

import styles from './styles';
import robot from './robot.png';

class ObserveResult extends Component {
    componentDidMount() {
        // const { canvas } = this.refs;
        // const ctx = canvas.getContext('2d');
        // console.log(ctx);
        // const img = new Image();
        // img.src = robot;
        // img.onload = () => {
        //     ctx.drawImage(img, 0, 0, 32, 32);
        // }
        const { svg, robot } = this.refs;
        document.getElementById('robot').style.x = '100px';
        document.getElementById('robot').style.y = '100px';
    }
    render() {
        return (
            <div className={styles.content}>
                <svg ref='svg'>
                    <image href={robot} id='robot'></image>
                </svg>
            </div>
        )
    }
}

export default ObserveResult;
