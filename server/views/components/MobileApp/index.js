'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DockPage from '../DockPage';
import LogicBlockly from '../LogicBlockly';
import LogicResult from '../LogicResult';
import ObserveResult from '../ObserveResult';
import ObserveRealTimeData from '../ObserveRealTimeData';
import Modal from '../Modal';
import { assimlate, update } from '../../redux/actions/dock';
import { stage_switch } from '../../redux/actions/stage';
import { observe_switch } from '../../redux/actions/observe';
import styles from './styles.css';

@connect(
    state => ({
        stage: state.stage,
        workspace: state.logic.workspace
    }),
    dispatch => ({
        handleAssimilate(e) {
            dispatch(assimlate());
        },
        handleUpdate(e) {
            const { workspace } = this.props;
            const XMLDom = Blockly.Xml.workspaceToDom(workspace);
            if (XMLDom.childNodes.length) {
                dispatch(update(XMLDom));
            }
        },
        handleSwitch(stage) {
            dispatch(stage_switch(stage));
        },
        handle2D(e) {
            dispatch(observe_switch(false));
        },
        handle3D(e) {
            dispatch(observe_switch(true));
        }
    })
)

class MobileApp extends Component {
    handleDock(e) {
        $('#dockModal').modal('show');
    }
    isDock(stage) {
        return stage === 0 ? ' ' + styles.active : '';
    }
    isLogic(stage) {
        return stage === 1 ? ' ' + styles.active : '';
    }
    isObserve(stage) {
        return stage === 2 ? ' ' + styles.active : '';
    }
    toDock(e) {
        const { handleSwitch } = this.props;
        handleSwitch(0);
    }
    toLogic(e) {
        const { handleSwitch } = this.props;
        handleSwitch(1);
    }
    toObserve(e) {
        const { handleSwitch } = this.props;
        handleSwitch(2);
    }
    render() {
        const { stage, handleAssimilate, handleDock, handleUpdate, handle2D, handle3D } = this.props;
        return (
            <div className={styles.outter}>
                <div className={styles.container}>
                    <nav className={styles.nav}>
                        <button type='button' className={'btn' + this.isDock(stage)} onClick={this.toDock.bind(this)}><span className='glyphicon glyphicon-home'></span></button>
                        <button type='button' className={'btn' + this.isLogic(stage)} onClick={this.toLogic.bind(this)}><span className='glyphicon glyphicon-scissors'></span></button>
                        <button type='button' className={'btn' + this.isObserve(stage)} onClick={this.toObserve.bind(this)}><span className='glyphicon glyphicon-king'></span></button>
                    </nav>
                    <div className={styles.content}>
                        {
                            stage > 0 ? <div className={styles.wrapper}>
                                            <div className={styles.left}>
                                                {
                                                    stage == 1 ? <LogicBlockly /> : <ObserveResult />
                                                }
                                            </div>
                                            <div className={styles.right}>
                                                {
                                                    stage == 1 ? <LogicResult /> : <ObserveRealTimeData />
                                                }
                                            </div>
                                        </div>
                                : <div className={styles.box}>
                                      <DockPage />
                                  </div>
                        }
                    </div>
                    <div className={styles.controller}>
                        {stage == 1 ? <button type='button' className='btn' onClick={handleAssimilate}><span className='glyphicon glyphicon-repeat'></span></button> : ''}
                        {stage == 2 ? <button type='button' className='btn' onClick={handle2D}>2D</button> : ''}
                        <button type='button' className='btn' onClick={this.handleDock}><span className='glyphicon glyphicon-equalizer'></span></button>
                        {stage == 1 ? <button type='button' className='btn' onClick={handleUpdate.bind(this)}><span className='glyphicon glyphicon-floppy-disk'></span></button> : ''}
                        {stage == 2 ? <button type='button' className='btn' onClick={handle3D}>3D</button> : ''}
                    </div>
                </div>
                <Modal />
            </div>
        )
    }
}

export default MobileApp;
