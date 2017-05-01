'use strict'
const express = require('express');
const router = express.Router();
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

const START = 1;
const END = 2;
const INPUT = 3;
const OUTPUT = 4;
const NUMBER = 5;
const WHILE = 6;
const FOR = 7;
const IF = 8;
const ELSE = 9;
const SYMBOL = 10;

const STATEMENT = 100;

const fake = [{
    type: FOR,
    value: 5
}, {
    type: START
}, {
    type: IF
}, {
    type: INPUT,
    value: 1
}, {
    type: SYMBOL,
    value: 1
}, {
    type: NUMBER,
    value: 50
}, {
    type: START
}, {
    type: OUTPUT,
    value: 0
}, {
    type: NUMBER,
    value: 50
}, {
    type: ELSE
}, {
    type: OUTPUT,
    value: 1
}, {
    type: NUMBER,
    value: 90
}, {
    type: END
}, {
    type: END
}]

const INPUT_TYPES = [
    'input_temperature',
    'input_distance'
];
const OUTPUT_TYPES = [
    'output_back',
    'output_anticlockwiserotate',
    'output_forward',
    'output_clockwiserotate',
    'output_speak',
    'output_blink'
];
const SYMBOL_TYPES = [
    'EQ',
    'NEQ',
    'LT',
    'LTE',
    'GT',
    'GTE'
]

const dataToBlocks = (data) => {
    const blocks = [];
};

class TreeNode {
    constructor(type, value = null, child = null, next = {}) {

    }
}

const dataToTree = (data) => {
    const root = {};
    let current = root;
    let child;
    let condition;
    let elseStatement;
    for (let i = 0; i < data.length; i++) {
        switch (data[i].type) {
            case START:
                break;
            case END:
                return {
                    root,
                    index: i
                };
            case INPUT:
                root.type = INPUT;
                root.value = data[i].value;
                return root;
            case OUTPUT:
                current.type = OUTPUT;
                current.value = data[i].value;
                current.child = dataToTree(data.slice(i + 1));
                i++;
                current.next = {};
                current = current.next;
                break;
            case NUMBER:
                root.type = NUMBER;
                root.value = data[i].value;
                return root;
            case WHILE:
                break;
            case FOR:
                current.type = FOR;
                current.value = data[i].value;
                child = dataToTree(data.slice(i + 1));
                current.child = child.root;
                i = i + 1 + child.index;
                current.next = {};
                current = current.next;
                break;
            case IF:
                current.type = IF;
                condition = dataToTree(data.slice(i + 1));
                current.condition = condition.root;
                i = i + 3;
                child = dataToTree(data.slice(i + 1));
                current.child = child.root;
                i = i + 1 + child.index;
                if (data[i].type === ELSE) {
                    elseStatement = dataToTree(data.slice(i + 1));
                    current.elseStatement = elseStatement.root;
                    i = i + 1 + elseStatement.index;
                }
                current.next = {};
                current = current.next;
                break;
            case ELSE:
                return {
                    root,
                    index: i
                }
                break;
            case SYMBOL:
                root.type = SYMBOL;
                root.value = data[i].value;
                root.child = dataToTree(data.slice(i + 1));
                root.child.next = dataToTree(data.slice(i + 2));
                return {
                    root,
                    index: 2
                }
            default:
                break;
        }
    }
    return root;
}

const preProcesser = (raw) => {
    const data = raw.concat();
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === SYMBOL) {
            const symbol = data.splice(i, 1)[0];
            data.splice(i - 1, 0, symbol);
        }
    }
    return data;
}

const angleNormalize = (angle) => {
    angle = Math.abs(angle);
    if (angle >= 360) {
        return 360;
    } else if (angle >= 270) {
        return 270;
    } else if (angle >= 180) {
        return 180;
    } else {
        return 90;
    }
}

const TreeNodeToXMLCreator = (doc) => (node) => {
    const TreeNodeToXML = TreeNodeToXMLCreator(doc);
    let block;
    let child;
    let value;
    let field;
    let text;
    let next;
    let statement;
    let mutation;
    switch (node.type) {
        case INPUT:
            block = doc.createElement('block');
            block.setAttribute('type', INPUT_TYPES[node.value]);
            return block;
        case OUTPUT:
            block = doc.createElement('block');
            child = TreeNodeToXML(node.child);
            value = node.value + 2;
            switch (node.value) {
                case 0:
                    if (child < 0) {
                        value -= 2;
                    }
                    field = doc.createElement('field');
                    field.setAttribute('name', 'DISTANCE');
                    text = doc.createTextNode(Math.abs(child));
                    field.appendChild(text);
                    block.appendChild(field);
                    break;
                case 1:
                    if (child < 0) {
                        value -= 2;
                    }
                    field = doc.createElement('field');
                    field.setAttribute('name', 'ANGLE');
                    text = doc.createTextNode(angleNormalize(child));
                    field.appendChild(text);
                    block.appendChild(field);
                    break;
                case 2:
                    block.appendChild(child);
                    break;
                case 3:
                    field = doc.createElement('field');
                    field.setAttribute('name', 'COLOR');
                    text = doc.createTextNode(chlid);
                    field.appendChild(text);
                    block.appendChild(field);
                default:
                    break;
            }
            block.setAttribute('type', OUTPUT_TYPES[value]);
            if (node.next.type) {
                next = doc.createElement('next');
                child = TreeNodeToXML(node.next);
                next.appendChild(child);
                block.appendChild(next);
            }
            return block;
        case NUMBER:
            return node.value;
        case WHILE:
            break;
        case FOR:
            block = doc.createElement('block');
            block.setAttribute('type', 'math_number');
            field = doc.createElement('field');
            field.setAttribute('name', 'NUM');
            text = doc.createTextNode(node.value);
            field.appendChild(text);
            block.appendChild(field);
            value = doc.createElement('value');
            value.setAttribute('name', 'TIMES');
            value.appendChild(block);
            block = doc.createElement('block');
            block.setAttribute('type', 'controls_repeat_ext');
            block.appendChild(value);
            child = TreeNodeToXML(node.child);
            statement = doc.createElement('statement');
            statement.setAttribute('name', 'DO');
            statement.appendChild(child);
            block.appendChild(statement);
            if (node.next.type) {
                next = doc.createElement('next');
                child = TreeNodeToXML(node.next);
                next.appendChild(child);
                block.appendChild(next);
            }
            return block;
        case IF:
            block = doc.createElement('block');
            block.setAttribute('type', 'controls_if');
            value = doc.createElement('value');
            value.setAttribute('name', 'IF0');
            child = TreeNodeToXML(node.condition);
            value.appendChild(child);
            child = TreeNodeToXML(node.child);
            statement = doc.createElement('statement');
            statement.setAttribute('name', 'DO0');
            statement.appendChild(child);
            if (typeof node.elseStatement === 'object') {
                mutation = doc.createElement('mutation');
                mutation.setAttribute('else', '1');
                block.appendChild(mutation);
                block.appendChild(value);
                block.appendChild(statement);
                statement = doc.createElement('statement');
                statement.setAttribute('name', 'ELSE');
                child = TreeNodeToXML(node.elseStatement);
                statement.appendChild(child);
                block.appendChild(statement);
            } else {
                block.appendChild(value);
                block.appendChild(statement);
            }
            if (node.next.type) {
                next = doc.createElement('next');
                child = TreeNodeToXML(node.next);
                next.appendChild(child);
                block.appendChild(next);
            }
            return block;
        case SYMBOL:
            block = doc.createElement('block');
            block.setAttribute('type', 'logic_compare');
            field = doc.createElement('name');
            field.setAttribute('name', 'OP');
            text = doc.createTextNode(SYMBOL_TYPES[node.value]);
            field.appendChild(text);
            block.appendChild(field);
            value = doc.createElement('value');
            value.setAttribute('name', 'A');
            child = TreeNodeToXML(node.child);
            if (typeof child === 'number') {
                field = doc.createElement('field');
                field.setAttribute('name', 'NUM');
                text = doc.createTextNode(child);
                field.appendChild(text);
                child = doc.createElement('block');
                child.setAttribute('type', 'math_number');
                child.appendChild(field);
            }
            value.appendChild(child);
            block.appendChild(value);
            value = doc.createElement('value');
            value.setAttribute('name', 'B');
            child = TreeNodeToXML(node.child.next);
            if (typeof child === 'number') {
                field = doc.createElement('field');
                field.setAttribute('name', 'NUM');
                text = doc.createTextNode(child);
                field.appendChild(text);
                child = doc.createElement('block');
                child.setAttribute('type', 'math_number');
                child.appendChild(field);
            }
            value.appendChild(child);
            block.appendChild(value);
            return block;
        default:
            break;
    }
}

const dataToXMLDom = (data) => {
    let doc = new DOMParser().parseFromString(' ', 'text/xml');
    let xml = doc.createElement('xml');

    const ripeData = preProcesser(fake);
    const root = dataToTree(ripeData);
    console.log(root);

    let block = TreeNodeToXMLCreator(doc)(root);
    block.setAttribute('x', 20);
    block.setAttribute('y', 20);
    xml.appendChild(block);
    doc.appendChild(xml);
    const str = new XMLSerializer().serializeToString(doc);
    console.log(str);
    return str;
}

router.post('/dock', (req, res) => {
    const XMLDom = dataToXMLDom(fake);
    res.status(200).json(XMLDom);
})

module.exports = router;
