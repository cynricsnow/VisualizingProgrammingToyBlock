'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import robot from './robot.png';

let direction = 0;
let x = 0;
let y = 0;
let frames = 0;
let height = 0;
let width = 0;

@connect(
    state => ({
        code: state.observe.code
    })
)
class ObserveResult extends Component {
    input_temperature() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/input_temperature', false);
        xhr.send(null);
        const temperature = +JSON.parse(xhr.response);
        return temperature;
    }
    input_distance() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/input_distance', false);
        xhr.send(null);
        const distance = +JSON.parse(xhr.response);
        return distance;
    }
    output_forward(distance) {
        const times = distance / 20;
        const robot = d3.select('#robot');
        setTimeout(() => {
            for (let i = 0; i < distance; i++) {
                switch (direction % 4) {
                    case 0:
                        y++;
                        break;
                    case 1:
                        x--;
                        break;
                    case 2:
                        y--;
                        break;
                    case 3:
                        x++;
                        break;
                    default:
                    break;
                }
                robot.transition()
                    .duration(50)
                    .delay(i * 50)
                    .style('transform', function(d, i, item) {
                        let angle = direction * 90 % 360;
                        return `translate(${x}px, ${y}px) rotate(${angle}deg)`;
                    });
            }
        }, frames * 1000);
        frames += times;
    }
    output_back(distance) {
        const times = distance / 20;
        const robot = d3.select('#robot');
        setTimeout(() => {
            for (let i = 0; i < distance; i++) {
                switch (direction % 4) {
                    case 0:
                        y--;
                        break;
                    case 1:
                        x++;
                        break;
                    case 2:
                        y++;
                        break;
                    case 3:
                        x--;
                        break;
                    default:
                    break;
                }
                robot.transition()
                    .duration(50)
                    .delay(i * 50)
                    .style('transform', function(d, i, item) {
                        let angle = direction * 90 % 360;
                        return `translate(${x}px, ${y}px) rotate(${angle}deg)`;
                    });
            }
        }, frames * 1000);
        frames += times;
    }
    output_clockwiserotate(angle) {
        const times = angle / 90;
        const robot = d3.select('#robot');
        setTimeout(() => {
            for (let i = 0; i < times; i++) {
                robot.transition()
                    .duration(1000)
                    .delay(i * 1000)
                    .style('transform', function(d, i, item) {
                        direction++;
                        let angle = direction * 90;
                        return `translate(${x}px, ${y}px) rotate(${angle}deg)`;
                    });
            }
        }, frames * 1000);
        frames += times;
    }
    output_anticlockwiserotate(angle) {
        const times = angle / 90;
        const robot = d3.select('#robot');
        setTimeout(() => {
            for (let i = 0; i < times; i++) {
                robot.transition()
                    .duration(1000)
                    .delay(i * 1000)
                    .style('transform', function(d, i, item) {
                        direction--;
                        let angle = direction * 90;
                        return `translate(${x}px, ${y}px) rotate(${angle}deg)`;
                    });
            }
        }, frames * 1000);
        frames += times;
    }
    output_speak(text) {
        const tip = d3.select('#tip');
        setTimeout(() => {
            tip.style('top', height / 2 + y - 19 + 'px')
                .style('left', width / 2 + x + 22 + 'px');
            tip.select('#box')
                .html(text);
            tip.transition()
                .duration(1000)
                .style('opacity', 1)
                .transition()
                .duration(1000)
                .delay(1000)
                .style('opacity', 0);
        }, frames * 1000);
        frames += 3;
    }
    output_blink(color) {
        const light = d3.select('#light');
        const red = parseInt(color.slice(1, 3), 16);
        const green = parseInt(color.slice(3, 5), 16);
        const blue = parseInt(color.slice(5, 7), 16);
        setTimeout(() => {
            light.attr('cx', width / 2 + x)
                .attr('cy', height / 2 + y);
            light.transition()
                .duration(500)
                .style('stroke', `rgba(${red}, ${green}, ${blue}, 0.3)`)
                .attr('r', 40)
                .transition()
                .duration(500)
                .attr('r', 0)
                .style('stroke', 'rgba(0, 0, 0, 0)')
                .transition()
                .duration(500)
                .style('stroke', `rgba(${red}, ${green}, ${blue}, 0.5)`)
                .attr('r', 40)
                .transition()
                .duration(500)
                .attr('r', 0)
                .style('stroke', 'rgba(0, 0, 0, 0)')
                .transition()
                .duration(500)
                .style('stroke', `rgba(${red}, ${green}, ${blue}, 0.7)`)
                .attr('r', 40)
                .transition()
                .duration(500)
                .attr('r', 0)
                .style('stroke', 'rgba(0, 0, 0, 0)')
        }, frames * 1000);
        frames += 3;
    }
    componentDidMount() {
        const svg = d3.select('svg');
        height = svg._groups[0][0].clientHeight;
        width = svg._groups[0][0].clientWidth;
        const robot = d3.select('#robot');
        robot.style('x', width / 2 - 30 + 'px')
            .style('y', height / 2 - 30 + 'px');
        robot.style('transform', 'translate(0, 0) rotate(0deg)');
        svg.append('circle')
            .attr('id', 'light')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', 0)
            .style('fill', 'rgba(0, 0, 0, 0)')
            .style('stroke-width', 10);
    }
    runCode() {
        const { code } = this.props;
        direction = 0;
        x = 0;
        y = 0;
        frames = 0;
        const robot = d3.select('#robot');
        robot.style('transform', 'translate(0, 0) rotate(0deg)');
        eval(code);
        eval('this.output_blink("#ff8c1a")')
        eval('this.output_speak("???")')
    }
    render() {
        return (
            <div className={styles.content}>
                <svg className={styles.svg}>
                    <image href={robot} id='robot' className={styles.robot} onClick={this.runCode.bind(this)}></image>
                </svg>
                <div id='tip' className={styles.tip}>
                    <p id='box' className={styles.box}></p>
                    <div className={styles.triangle}></div>
                    <div className={styles.triangle}></div>
                </div>
            </div>
        )
    }
}

export default ObserveResult;
