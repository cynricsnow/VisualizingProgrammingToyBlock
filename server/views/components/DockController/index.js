'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { assimlate, update } from '../../redux/actions/dock';
import { observe_switch } from '../../redux/actions/observe';
import Modal from '../Modal';
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
        handleUpdate(e) {
            const { workspace } = this.props;
            const XMLDom = Blockly.Xml.workspaceToDom(workspace);
            if (XMLDom.childNodes.length) {console.log(XMLDom)
                dispatch(update(XMLDom));
            }
        },
        handle2D(e) {
            dispatch(observe_switch(false));
        },
        handle3D(e) {
            dispatch(observe_switch(true));
        }
    })
)
class DockController extends Component {
    handleDock(e) {
        $('#dockModal').modal('show');
    }
    render() {
        const { hide, handleAssimilate, handleUpdate, handle2D, handle3D } = this.props;
        return (
            <div>
                <div className={styles.controller}>
                    {!hide ? <button type='button' className='btn' onClick={handleAssimilate}><span className='glyphicon glyphicon-repeat'></span></button> : ''}
                    {hide ? <button type='button' className='btn' onClick={handle2D}>2D</button> : ''}
                    <button type='button' className='btn' onClick={this.handleDock}><span className='glyphicon glyphicon-equalizer'></span></button>
                    {!hide ? <button type='button' className='btn' onClick={handleUpdate.bind(this)}><span className='glyphicon glyphicon-floppy-disk'></span></button> : ''}
                    {hide ? <button type='button' className='btn' onClick={handle3D}>3D</button> : ''}
                </div>
                <Modal/>
            </div>
        )
    }
}

export default DockController;
