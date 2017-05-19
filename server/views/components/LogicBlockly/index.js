'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import StringToXMLDom from '../../common/StringToXMLDom';
import { show } from '../../redux/actions/dock';
import { logic_initial } from '../../redux/actions/logic';
import './custom';
import toolbox from './toolbox';
import styles from './styles';

@connect(
    state => ({
        workspace: state.logic.workspace,
        workspaceBlocks: state.logic.XMLDom,
        flag: state.dock.flag
    }),
    dispatch => ({
        showButton() {
            dispatch(show());
        },
        init(workspace) {
            dispatch(logic_initial(workspace));
        }
    })
)
class LogicBlockly extends Component {
    componentDidMount() {
        const { showButton, init } = this.props;
        const xml = StringToXMLDom(toolbox).childNodes[0];
        const workspace = Blockly.inject('blockly-workspace', {
            media: './media/',
            toolbox: xml
        });
        showButton();
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
    render() {
        return (
            <div className={styles.content}>
                <div id='blockly-workspace'></div>
            </div>
        )
    }
}

export default LogicBlockly;
