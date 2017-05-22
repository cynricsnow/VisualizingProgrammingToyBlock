'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles';

let frames = 0;

@connect(
    state => ({
        code: state.observe.code
    })
)
class ObserveWorld extends Component {
    input_temperature() {
        const temperature = (Math.random() * 80 - 30).toFixed(1)
        return temperature;
    }
    input_distance() {
        const distance = (Math.random() * 100).toFixed(2);
        return distance;
    }
    output_forward(distance) {
        const times = distance / 20;
        setTimeout(() => {
            let dir =window.frames['world'].direction % 4;
            dir = dir > 0 ? dir : dir + 4;
            switch (dir) {
                case 0:
                case 4:
                    window.frames['world'].y+=distance;
                    break;
                case 1:
                    window.frames['world'].x-=distance;
                    break;
                case 2:
                    window.frames['world'].y-=distance;
                    break;
                case 3:
                    window.frames['world'].x+=distance;
                    break;
                default:
                    break;
            }
        }, frames * 1000);
        frames += times * 1.5;
    }
    output_back(distance) {
        const times = distance / 20;
        setTimeout(() => {
            let dir = window.frames['world'].direction % 4;
            dir = dir > 0 ? dir : dir + 4;
            switch (dir) {
                case 0:
                case 4:
                    window.frames['world'].y-=distance;
                    break;
                case 1:
                    window.frames['world'].x+=distance;
                    break;
                case 2:
                    window.frames['world'].y+=distance;
                    break;
                case 3:
                    window.frames['world'].x-=distance;
                    break;
                default:
                    break;
            }
        }, frames * 1000);
        frames += times * 1.5;
    }
    output_clockwiserotate(angle) {
        const times = angle / 90;
        setTimeout(() => {
            for (let i = 0; i < times; i++) {
                window.frames['world'].direction++;
            }
        }, frames * 1000);
        frames += times * 4;
    }
    output_anticlockwiserotate(angle) {
        const times = angle / 90;
        setTimeout(() => {
            for (let i = 0; i < times; i++) {
                window.frames['world'].direction--;
            }
        }, frames * 1000);
        frames += times * 4;
    }
    output_speak(text) {}
    output_blink(color) {
        const rgb = parseInt(color.slice(1, 7), 16);
        setTimeout(() => {
            window.frames['world'].color = rgb;
            window.frames['world'].show = true;
        }, frames * 1000);
        frames += 3;
        setTimeout(() => {
            window.frames['world'].hide = true;
        }, frames * 1000);
    }
    reset() {
        setTimeout(() => {
            window.frames['world'].direction = 0;
            window.frames['world'].x = 0;
            window.frames['world'].y = 0;
            frames = 0;
        }, frames * 1000);
    }
    componentDidMount() {
        window.frames['world'].onclick = this.runCode.bind(this);
    }
    runCode() {
        const { code } = this.props;
        window.frames['world'].direction = 0;
        window.frames['world'].x = 0;
        window.frames['world'].y = 0;
        frames = 0;
        try {
            eval(code);
        } catch (e) {
            alert('逻辑错误');
        }
        this.reset();
    }
    render() {
        return (
            <div className={styles.content}>
                <iframe name='world' src='world.html' />
            </div>
        )
    }
}

export default ObserveWorld;
