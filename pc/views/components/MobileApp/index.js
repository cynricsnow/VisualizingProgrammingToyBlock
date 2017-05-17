'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DockPage from '../DockPage';
import LogicBlockly from '../LogicBlockly';
import LogicResult from '../LogicResult';
import ObserveResult from '../ObserveResult';
import ObserveRealTimeData from '../ObserveRealTimeData';
import { assimlate, dock, update } from '../../redux/actions/dock';
import { stage_switch } from '../../redux/actions/stage';
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
        handleDock(e) {
            dispatch(dock());
        },
        handleUpdate(e) {
            const { workspace } = this.props;
            const XMLDom = Blockly.Xml.workspaceToDom(workspace);
            dispatch(update(XMLDom));
        },
        handleSwitch(stage) {
            dispatch(stage_switch(stage));
        }
    })
)

class MobileApp extends Component {
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
        const { stage, handleAssimilate, handleDock, handleUpdate } = this.props;
        return (
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
                    <button type='button' className='btn' onClick={handleDock}><span className='glyphicon glyphicon-equalizer'></span></button>
                    {stage == 1 ? <button type='button' className='btn' onClick={handleUpdate.bind(this)}><span className='glyphicon glyphicon-floppy-disk'></span></button> : ''}
                </div>
            </div>
        )
    }
}

export default MobileApp;
