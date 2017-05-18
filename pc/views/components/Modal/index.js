'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dock } from '../../redux/actions/dock';

@connect(
    null,
    dispatch => ({
        handleDock(e) {
            let { src, dest } = this.refs;
            src = src.value ? src.value : src.placeholder;
            dest = dest.value ? dest.value : dest.placeholder;
            dispatch(dock(src, dest));
            $('#dockModal').modal('hide');
        }
    })
)
class Modal extends Component {
    render() {
        const { handleDock } = this.props;
        return (
            <div className='modal fade bs-example-modal-sm' id='dockModal' role='dialog' aria-labelledby='exampleModalLabel'>
                <div className='modal-dialog modal-sm' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                            <h4 className='modal-title' id='exampleModalLabel'>对接积木</h4>
                        </div>
                        <div className='modal-body'>
                            <form>
                                <div className='form-group'>
                                    <label className='control-label'>本设备外网IP:</label>
                                    <input type='text' className='form-control' ref='src' placeholder={returnCitySN.cip}/>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label'>编程积木局域网IP:</label>
                                    <input type='text' className='form-control' ref='dest' placeholder='192.168.0.1' />
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default' data-dismiss='modal'>关闭</button>
                            <button type='button' className='btn btn-primary' onClick={handleDock.bind(this)}>对接</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;
