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
