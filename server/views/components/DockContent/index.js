'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';
import draw from './draw';

@connect(
    state => ({
        toyBlocks: state.dock.blocks
    })
)
class DockContent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { toyBlocks } = nextProps;
        const { canvas } = this.refs;
        if (toyBlocks.length) {
            draw(canvas, toyBlocks);
        }
        return false;
    }
    componentDidMount() {
        const { toyBlocks } = this.props;
        const { canvas } = this.refs;
        if (toyBlocks.length) {
            draw(canvas, toyBlocks);
        }
    }
    render() {
        return (
            <div className={styles.result}>
                <canvas ref='canvas' width={800} height={300}></canvas>
            </div>
        )
    }
}

export default DockContent;
