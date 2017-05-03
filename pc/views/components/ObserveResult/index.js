'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import robot from './robot.png';

const input_temperature = () => (Math.random() * 80 - 30).toFixed(1);
const input_distance = () => (Math.random() * 100).toFixed(2);

const output_forward = distance => {
    console.log(distance);
};
const output_back = distance => {
    console.log(distance);
};
const output_clockwiserotate = angle => {
    console.log(angle);
};
const output_anticlockwiserotate = angle => {
    console.log(angle);
};
const output_speak = text => {
    console.log(text);
};
const output_blink = color => {
    console.log(color);
};

@connect(
    state => ({
        code: state.observe.code
    })
)
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
        // const { svg, robot } = this.refs;
        const robot = document.getElementById('robot');
        robot.style.x = '368px';
        robot.style.y = '169px';
    }
    runCode() {
        const { code } = this.props;
        console.log(code);
        eval(code);
    }
    render() {
        return (
            <div className={styles.content}>
                <svg ref='svg' className={styles.svg}>
                    <image href={robot} id='robot' onClick={this.runCode.bind(this)}></image>
                </svg>
            </div>
        )
    }
}

export default ObserveResult;
