'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { assimlate, dock, update } from '../../redux/actions/dock';
import styles from './styles.css';

@connect(
    state => ({
        hide: state.dock.hide,
        workspace: state.logic.workspace
    }),
    dispatch => ({
        handleAssimilate(e) {
            dispatch(assimlate());
        },
        handleDock(e) {
            dispatch(dock());
        },
        handleUpdate(e) {
            const { workspace } = this.props;
            const XMLDom = Blockly.Xml.workspaceToDom(workspace);
            dispatch(update(XMLDom));
        }
    })
)
class DockController extends Component {
    render() {
        const { hide, handleAssimilate, handleDock, handleUpdate } = this.props;
        return (
            <div className={styles.controller}>
                {!hide ? <button type='button' className='btn' onClick={handleAssimilate}><span className='glyphicon glyphicon-repeat'></span></button> : ''}
                <button type='button' className='btn' onClick={handleDock}><span className='glyphicon glyphicon-equalizer'></span></button>
                {!hide ? <button type='button' className='btn' onClick={handleUpdate.bind(this)}><span className='glyphicon glyphicon-floppy-disk'></span></button> : ''}
            </div>
        )
    }
}

export default DockController;
