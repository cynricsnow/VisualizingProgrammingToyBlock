'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dock } from '../../redux/actions';
import cube from './cube.png';
import styles from './styles.css';

@connect(
    state => ({
        toyBlocks: state.dock
    }),
    dispatch => ({
        handleClick(e) {
            this.draw();
            dispatch(dock());
        }
    })
)
class DockContent extends Component {
    draw(blocks) {
        const { canvas } = this.refs;
        const cxt = canvas.getContext('2d');
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        let xy = [];
        for (let i = 0; i < 10; i++) {
            xy[i] = [];
            for (let j = 0; j < 10; j++) {
                xy[i][j] = [42 + 22 * i, 22 * j, 20, 20];
            }
        }
        cxt.fillStyle = '#FFF';
        cxt.fillRect(0, 56, 40, 40);
        cxt.fillRect(...xy[2][3]);
        cxt.fillRect(...xy[2][4]);
        cxt.fillRect(...xy[4][3]);
        cxt.fillRect(...xy[4][4]);
        cxt.fillRect(...xy[6][3]);
        cxt.fillRect(...xy[9][3]);
        cxt.fillStyle = '#745ba5';
        cxt.fillRect(...xy[0][3]);
        cxt.fillRect(...xy[3][3]);
        cxt.fillRect(...xy[3][4]);
        cxt.fillRect(...xy[8][3]);
        cxt.fillRect(...xy[8][4]);
        cxt.fillStyle = '#5ba58c';
        cxt.fillRect(...xy[0][2]);
        cxt.fillStyle = '#5b80a5';
        cxt.fillRect(...xy[1][1]);
        cxt.fillRect(...xy[1][3]);
        cxt.fillRect(...xy[1][4]);
        cxt.fillRect(...xy[7][1]);
        cxt.fillRect(...xy[7][3]);
        cxt.fillRect(...xy[7][4]);
        cxt.fillStyle = '#5b67a5';
        cxt.fillRect(...xy[1][2]);
        cxt.fillRect(...xy[7][2]);
        cxt.fillStyle = '#5ba55b';
        cxt.fillRect(...xy[5][3]);
        cxt.fillStyle = '#a5745b';
        cxt.fillRect(...xy[1][0]);
        cxt.fillRect(...xy[7][0]);
    }
    componentDidMount() {
        const { toyBlocks, handleClick } = this.props;
        if (toyBlocks) {
            this.draw();
        }
    }
    render() {
        const { handleClick } = this.props;
        return (
            <div className={styles.content}>
                <div className={styles.result}>
                    <canvas ref='canvas'></canvas>
                </div>
                <div className={styles.controller}>
                    <button type='button' className='btn' onClick={handleClick.bind(this)}><img src={cube}/></button>
                </div>
            </div>
        )
    }
}

export default DockContent;
