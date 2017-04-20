'use strict'
import React, { Component } from 'react';

import './custom';
import toolbox from './toolbox';
import styles from './styles.css';

let outputAppendText = null;
let outputAppendChild = null;
let createColorDiv = null;
let myInterpreter = null;
let highlightPause = false;
let parse = false;

class LogicPage extends Component {
    state = {
        workspace: null
    }
    componentDidMount() {
        const { output } = this.refs;
        outputAppendText = (output => text => output.appendChild(document.createTextNode(text)))(output);
        outputAppendChild = (output => node => output.appendChild(node))(output);
        createColorDiv = (output => color => {
            const div = document.createElement('div');
            div.style.backgroundColor = color;
            return div;
        })(output);
        const workspace = Blockly.inject('blockly-blocks', {
            media: './media/',
            toolbox
        });
        this.setState({
            workspace
        })
    }
    runCode() {
        const { workspace } = this.state;
        const { output, step, forward } = this.refs;
        step.disabled = 'disabled';
        forward.disabled = 'disabled';
        window.LoopTrap = 1000;
        Blockly.JavaScript.STATEMENT_PREFIX = null;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        try {
            output.innerHTML = '运行中...\n';
            eval(code);
        } catch (e) {
            alert(e);
        } finally {
            workspace.highlightBlock(null);
            parse = false;
            output.firstChild.data = '运行完毕\n';
            step.disabled = '';
            forward.disabled = '';
        }
    }
    initApi(interpreter, scope) {
        const { output } = this.refs;
        let wrapper = null;
        wrapper = node => interpreter.createPrimitive(output.appendChild(node));
        interpreter.setProperty(scope, 'outputAppendChild', interpreter.createNativeFunction(wrapper));
        wrapper = text => {
            text = text ? text.toString() : '';
            return interpreter.createPrimitive(output.appendChild(document.createTextNode(text)));
        };
        interpreter.setProperty(scope, 'outputAppendText', interpreter.createNativeFunction(wrapper));
        interpreter.setProperty(scope, 'createColorDiv', interpreter.createNativeFunction(createColorDiv));
        wrapper = id => {
            id = id ? id.toString() : '';
            return interpreter.createPrimitive(this.highlightBlock.bind(this)(id));
        };
        interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
    }
    highlightBlock(id) {
        const { workspace } = this.state;
        workspace.highlightBlock(id);
        highlightPause = true;
    }
    parseCode() {
        const { workspace } = this.state;
        const { output } = this.refs;
        output.innerHTML = '解析中...\n';
        window.LoopTrap = 1000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        Blockly.JavaScript.addReservedWords('highlightBlock');
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        myInterpreter = new Interpreter(code, this.initApi.bind(this));
        highlightPause = false;
        parse = true;
        workspace.highlightBlock(null);
    }
    stepCode() {
        const { workspace } = this.state;
        const { output } = this.refs;
        let ok = null;
        try {
            if (!parse) {
                this.parseCode.bind(this)();
                output.innerHTML = '运行中...\n';
            }
            ok = myInterpreter.step();
        } finally {
            if (!ok) {
                output.firstChild.data = '运行完毕\n';
                workspace.highlightBlock(null);
                myInterpreter = null;
                parse = false;
                return;
            }
        }
        if (highlightPause) {
            highlightPause = false;
        } else {
            this.stepCode();
        }
    }
    forwardCode() {
        const { workspace } = this.state;
        const { output, run, step } = this.refs;
        run.disabled = 'disabled';
        step.disabled = 'disabled';
        if (!parse) {
            this.parseCode.bind(this)();
            output.innerHTML = '运行中...\n';
        }
        const nextStep = () => {
            if (myInterpreter.step()) {
                window.setTimeout(nextStep, 10);
            } else {
                window.setTimeout(function() {
                    workspace.highlightBlock(null);
                    myInterpreter = null;
                    output.firstChild.data = '运行完毕\n';
                    parse = false;
                    run.disabled = '';
                    step.disabled = '';
                }, 10);
            }
        }
        try {
            nextStep();
        } catch (e) {
            alert(e);
        }
    }
    render() {
        return (
            <div className={styles.blockly}>
                <div id='blockly-blocks'></div>
                <section id='blockly-result'>
                    <p id='blockly-log' ref='output'></p>
                    <div id='blockly-controller'>
                        <button type='button' className='btn' ref='run' id='blockly-run' onClick={this.runCode.bind(this)}><span className='glyphicon glyphicon-play'></span></button>
                        <button type='button' className='btn' ref='step' id='blockly-step' onClick={this.stepCode.bind(this)}><span className='glyphicon glyphicon-step-forward'></span></button>
                        <button type='button' className='btn' ref='forward' id='blockly-forward' onClick={this.forwardCode.bind(this)}><span className='glyphicon glyphicon-forward'></span></button>
                    </div>
                </section>
            </div>
        )
    }
}

export default LogicPage;
