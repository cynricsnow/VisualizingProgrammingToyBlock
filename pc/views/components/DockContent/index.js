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
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let xy = [];
        for (let i = 0; i < 10; i++) {
            xy[i] = [];
            for (let j = 0; j < 10; j++) {
                xy[i][j] = [42 + 22 * i, 22 * j, 20, 20];
            }
        }
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 56, 40, 40);
        ctx.fillRect(...xy[2][3]);
        ctx.fillRect(...xy[2][4]);
        ctx.fillRect(...xy[4][3]);
        ctx.fillRect(...xy[4][4]);
        ctx.fillRect(...xy[6][3]);
        ctx.fillRect(...xy[9][3]);
        ctx.fillStyle = '#745ba5';
        ctx.fillRect(...xy[0][3]);
        ctx.fillRect(...xy[3][3]);
        ctx.fillRect(...xy[3][4]);
        ctx.fillRect(...xy[8][3]);
        ctx.fillRect(...xy[8][4]);
        ctx.fillStyle = '#5ba58c';
        ctx.fillRect(...xy[0][2]);
        ctx.fillStyle = '#5b80a5';
        ctx.fillRect(...xy[1][1]);
        ctx.fillRect(...xy[1][3]);
        ctx.fillRect(...xy[1][4]);
        ctx.fillRect(...xy[7][1]);
        ctx.fillRect(...xy[7][3]);
        ctx.fillRect(...xy[7][4]);
        ctx.fillStyle = '#5b67a5';
        ctx.fillRect(...xy[1][2]);
        ctx.fillRect(...xy[7][2]);
        ctx.fillStyle = '#5ba55b';
        ctx.fillRect(...xy[5][3]);
        ctx.fillStyle = '#a5745b';
        ctx.fillRect(...xy[1][0]);
        ctx.fillRect(...xy[7][0]);
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
