'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import loadXMLString from '../../common/loadXMLString';
import { logic_initial, logic_modify } from '../../redux/actions';
import './custom';
import toolbox from './toolbox';
import styles from './styles';

@connect(
    state => ({
        workspace: state.workspace,
        workspaceBlocks: state.logic
    }),
    dispatch => ({
        init(workspace) {
            dispatch(logic_initial(workspace));
        },
        update(xml) {
            dispatch(logic_modify(xml));
        }
    })
)
class LogicBlockly extends Component {
    componentDidMount() {
        const { init } = this.props;
        const xml = loadXMLString(toolbox).childNodes[0];
        const workspace = Blockly.inject('blockly-workspace', {
            media: './media/',
            toolbox: xml
        });

        init(workspace);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { workspace, workspaceBlocks } = nextProps;
        if (workspaceBlocks) {
            workspace.clear();
            Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
        }
        return false;
    }
    componentWillUnmount() {
        const { workspace, update } = this.props;
        const XMLDom = Blockly.Xml.workspaceToDom(workspace);

        update(XMLDom);
    }
    render() {
        return (
            <div className={styles.content}>
                <div id='blockly-workspace'></div>
            </div>
        )
    }
}

export default LogicBlockly;
