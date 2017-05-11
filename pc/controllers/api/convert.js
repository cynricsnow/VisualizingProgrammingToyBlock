'use strict'
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

const TEXT = 11;
const COLOR = 12;

const WRONG = 13;

const INPUT_TYPES = [
    'input_temperature',
    'input_distance'
];
const INPUT_TYPES_SYMBOL = [
    '\u2744',
    '\u21AD'
];
const OUTPUT_TYPES = [
    'output_back',
    'output_anticlockwiserotate',
    'output_forward',
    'output_clockwiserotate',
    'output_speak',
    'output_blink'
];
const OUTPUT_TYPES_SYMBOL = [
    '\u2191',
    '\u21BB',
    '\u266C',
    '\u2721'
];
const SYMBOL_TYPES = [
    '==',
    '!=',
    '<',
    '<=',
    '>',
    '>='
];
const SYMBOL_TYPES_SYMBOL = [
    '=',
    '\u2260',
    '<',
    '\u2264',
    '>',
    '\u2265'
];
const SYMBOL_TYPES_TEXT = [
    'EQ',
    'NEQ',
    'LT',
    'LTE',
    'GT',
    'GTE'
];

let flag = 1;

class TreeNode {
    constructor(type, value = null, child = null, next = {}) {

    }
}

const dataToBlocks = (data) => {
    const array = data.concat();
    const blocks = [];
    let x = 0;
    let y = 0;
    let block;
    for (let i = 0; i < array.length; i++) {
        block = {};
        switch(array[i].type) {
            case START:
                block.type = START;
                block.x = x;
                block.y = 0;
                x++;
                y = 0;
                break;
            case END:
                block.type = END;
                block.x = x;
                block.y = 0;
                x++;
                y = 0;
                break;
            case INPUT:
                block.type = INPUT;
                block.symbol = INPUT_TYPES_SYMBOL[array[i].value];
                if (i === 0) {
                    x++;
                }
                block.x = x - 1;
                block.y = y;
                y = y == 3 ? 1 : 0;
                break;
            case OUTPUT:
                block.type = OUTPUT;
                block.symbol = OUTPUT_TYPES_SYMBOL[array[i].value];
                block.x = x;
                block.y = 0;
                x++;
                y = 1;
                break;
            case NUMBER:
                block.type = NUMBER;
                block.value = array[i].value;
                if (i === 0) {
                    x++;
                }
                block.x = x - 1;
                block.y = y;
                y = y == 3 ? 1 : 0;
                break;
            case WHILE:
                break;
            case FOR:
                block.type = FOR;
                block.value = array[i].value;
                block.x = x;
                block.y = 0;
                x++;
                y = 0;
                break;
            case IF:
                block.type = IF;
                block.x = x;
                block.y = 0;
                x++;
                y = 0;
                break;
            case ELSE:
                block.type = ELSE;
                block.x = x;
                block.y = 0;
                x++;
                y = 0;
                break;
            case SYMBOL:
                block.type = SYMBOL;
                block.symbol = SYMBOL_TYPES_SYMBOL[array[i].value];
                if (i === 0) {
                    x++;
                }
                block.x = x - 1;
                block.y = 2;
                y = 3;
                if (i + 1 >= array.length || (array[i + 1].type !== INPUT && array[i + 1].type !== NUMBER)) {
                    array.splice(i + 1, 0, {type: WRONG});
                }
                if (i + 2 >= array.length || (array[i + 2].type !== INPUT && array[i + 2].type !== NUMBER)) {
                    array.splice(i + 1, 1, {type: WRONG}, {type: WRONG});
                }
                break;
            case TEXT:
                block.type = TEXT;
                block.value = array[i].value;
                if (i === 0) {
                    x++;
                }
                block.x = x - 1;
                block.y = y;
                y = 0;
                break;
            case COLOR:
                block.type = COLOR;
                block.value = array[i].value;
                block.x = x - 1;
                block.y = y;
                y = 0;
                break;
            case WRONG:
                block.type = WRONG;
                block.x = x - 1;
                block.y = y;
                y = y == 3 ? 1 : 0;
                break;
            default:
                break;
        }
        blocks.push(block);
    }
    return blocks;
};

const dataToTree = (data) => {
    const root = {};
    let current = root;
    let child;
    let condition;
    let elseStatement;
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        index = 0;
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
                if (data[i].value === 2) {
                    if (i + 1 < data.length) {
                        if (data[i + 1].type === INPUT ||
                            data[i + 1].type === NUMBER ||
                            data[i + 1].type === TEXT) {
                            current.child = dataToTree(data.slice(i + 1));
                            i++;
                        } else if (data[i + 1].type === SYMBOL) {
                            child = dataToTree(data.slice(i + 1));
                            current.child = child.root;
                            i = i + 1 + child.index;
                        } else {
                            current.child = {};
                        }
                    } else {
                        current.child = {};
                    }
                } else {
                    current.child = dataToTree(data.slice(i + 1));
                    i++;
                }
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
                i = i + data.slice(i + 1).findIndex(item => item.type === START);
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
                if (i + 1 < data.length && (data[i + 1].type === INPUT || data[i + 1].type === NUMBER)) {
                    root.child = dataToTree(data.slice(i + 1));
                    index++;
                    if (i + 2 < data.length && (data[i + 2].type === INPUT || data[i + 2].type === NUMBER)) {
                        root.child.next = dataToTree(data.slice(i + 2));
                        index++;
                    } else {
                        root.child.next = {};
                    }
                } else {
                    root.child = {};
                    root.child.next = {};
                }
                return {
                    root,
                    index
                }
            case TEXT:
                root.type = TEXT;
                root.value = data[i].value;
                return root;
            case COLOR:
                root.type = COLOR;
                root.value = data[i].value;
                return root;
            default:
                break;
        }
    }
    return root;
};

const processData = (raw) => {
    const data = raw.concat();
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === SYMBOL) {
            const symbol = data.splice(i, 1)[0];
            data.splice(i - 1, 0, symbol);
        }
    }
    return data;
};

const recoverData = (data) => {
    const raw = data.concat();
    for (let i = 0; i < raw.length; i++) {
        if (raw[i].type === SYMBOL) {
            const symbol = raw.splice(i, 1)[0];
            raw.splice(i + 1, 0, symbol);
            i++;
        }
    }
    return raw;
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
};

const TreeNodeToXMLCreator = (doc) => (node) => {
    const TreeNodeToXML = TreeNodeToXMLCreator(doc);
    let block;
    let type;
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
            type = node.value + 2;
            switch (node.value) {
                case 0:
                    if (child < 0) {
                        type -= 2;
                    }
                    field = doc.createElement('field');
                    field.setAttribute('name', 'DISTANCE');
                    text = doc.createTextNode(Math.abs(child));
                    field.appendChild(text);
                    block.appendChild(field);
                    break;
                case 1:
                    if (child < 0) {
                        type -= 2;
                    }
                    field = doc.createElement('field');
                    field.setAttribute('name', 'ANGLE');
                    text = doc.createTextNode(angleNormalize(child));
                    field.appendChild(text);
                    block.appendChild(field);
                    break;
                case 2:
                    value = doc.createElement('value');
                    value.setAttribute('name', 'WORDS');
                    value.appendChild(child);
                    block.appendChild(value);
                    break;
                case 3:
                    field = doc.createElement('field');
                    field.setAttribute('name', 'COLOR');
                    text = doc.createTextNode(child);
                    field.appendChild(text);
                    block.appendChild(field);
                default:
                    break;
            }
            block.setAttribute('type', OUTPUT_TYPES[type]);
            if (node.next.type) {
                next = doc.createElement('next');
                child = TreeNodeToXML(node.next);
                next.appendChild(child);
                block.appendChild(next);
            }
            return block;
        case NUMBER:
        case COLOR:
            return node.value;
        case WHILE:
            break;
        case FOR:
            block = doc.createElement('block');
            block.setAttribute('type', 'math_number');
            field = doc.createElement('field');
            field.setAttribute('name', 'TIMES');
            text = doc.createTextNode(node.value);
            field.appendChild(text);
            block = doc.createElement('block');
            block.setAttribute('type', 'controls_repeat');
            block.appendChild(field);
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
            field = doc.createElement('field');
            field.setAttribute('name', 'OP');
            text = doc.createTextNode(SYMBOL_TYPES_TEXT[node.value]);
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
        case TEXT:
            block = doc.createElement('block');
            block.setAttribute('type', 'text');
            field = doc.createElement('field');
            field.setAttribute('name', 'TEXT');
            text = doc.createTextNode(node.value);
            field.appendChild(text);
            block.appendChild(field);
            return block;
        default:
            break;
    }
};

const treeToXML = (root) => {
    let doc = new DOMParser().parseFromString(' ', 'text/xml');
    let xml = doc.createElement('xml');
    let block = TreeNodeToXMLCreator(doc)(root);
    block.setAttribute('x', 40);
    block.setAttribute('y', 20);
    xml.appendChild(block);
    doc.appendChild(xml);
    const str = new XMLSerializer().serializeToString(doc);
    return str;
};

const TreeNodeToCode = (node, indent = 0) => {
    let space = Array(indent).fill('    ').join('');
    let code = space.concat();
    let child;
    let type;
    let condition;
    let statement;
    switch (node.type) {
        case INPUT:
            code += 'this.' + INPUT_TYPES[node.value];
            code += '()';
            break;
        case OUTPUT:
            child = TreeNodeToCode(node.child);
            type = node.value + 2;
            if (node.value < 2 && child < 0) {
                type -= 2;
            }
            switch (type) {
                case 0:
                case 2:
                    child = Math.abs(child);
                    break;
                case 1:
                case 3:
                    child = angleNormalize(child);
                    break;
                default:
                    break;
            }
            code += 'this.' + OUTPUT_TYPES[type] + `(${child});\n`;
            if (node.next.type) {
                code += TreeNodeToCode(node.next, indent);
            }
            break;
        case NUMBER:
            code += node.value;
            break;
        case WHILE:
            break;
        case FOR:
            child = TreeNodeToCode(node.child, indent + 1);
            code += `for (let i = 0; i < ${node.value}; i++) {\n${child}${space}}\n`;
            if (node.next.type) {
                code += TreeNodeToCode(node.next, indent);
            }
            break;
        case IF:
            condition = TreeNodeToCode(node.condition);
            statement = TreeNodeToCode(node.child, indent + 1);
            code += `if (${condition}) {\n${statement}${space}}\n`;
            if (typeof node.elseStatement === 'object') {
                statement = TreeNodeToCode(node.elseStatement, indent + 1);
                code += `${space}else {\n${statement}${space}}\n`
            }
            if (node.next.type) {
                code += TreeNodeToCode(node.next, indent);
            }
            break;
        case SYMBOL:
            child = TreeNodeToCode(node.child);
            code += child;
            code += ' ';
            code += SYMBOL_TYPES[node.value];
            code += ' ';
            child = TreeNodeToCode(node.child.next);
            code += child;
            break;
        case TEXT:
            code += `"${node.value}"`;
            break;
        case COLOR:
            code += `"${node.value}"`;
            break;
        default:
            break;
    }
    return code;
};

const blockToData = (block) => {
    const data = [];
    let element = {};
    const type = block.getAttribute('type');
    let children = block.childNodes;
    switch (type) {
        case 'controls_if':
            element.type = IF;
            data.push(element);
            data.push({ type: START });
            data.push({ type: END });
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    let name = children[i].getAttribute('name');
                    if (name === 'IF0') {
                        data.splice(1, 0, ...XMLDomToData(children[i]));
                        continue;
                    } else if (name === 'ELSE') {
                        data.splice(data.length - 1, 0, { type: ELSE }, ...XMLDomToData(children[i]));
                    } else if (children[i].tagName !== 'next') {
                        data.splice(data.length - 1, 0, ...XMLDomToData(children[i]));
                    } else {
                        data.push(...XMLDomToData(children[i]));
                    }
                }
            }

            break;
        case 'controls_repeat':
            element.type = FOR;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    let name = children[i].getAttribute('name');
                    if (name === 'TIMES') {
                        element.value = XMLDomToData(children[i])[0];
                        data.push(element);
                        data.push({ type: START });
                        data.push({ type: END });
                    } else if (children[i].tagName !== 'next') {
                        data.splice(data.length - 1, 0, ...XMLDomToData(children[i]));
                    } else {
                        data.push(...XMLDomToData(children[i]));
                    }
                }
            }
            break;
        case 'logic_compare':
        case 'math_number':
        case 'math_arithmetic':
        case 'math_number_property':
        case 'math_round':
        case 'text':
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    data.push(...XMLDomToData(children[i]));
                }
            }
            break;
        case 'input_temperature':
        case 'input_distance':
            element.type = INPUT;
            element.value = INPUT_TYPES.indexOf(type);
            data.push(element);
            break;
        case 'output_back':
        case 'output_anticlockwiserotate':
            flag = -1;
        case 'output_forward':
        case 'output_clockwiserotate':
        case 'output_speak':
        case 'output_blink':
            element.type = OUTPUT;
            element.value = OUTPUT_TYPES.indexOf(type) - ((flag == 1) ? 2 : 0);
            data.push(element);
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    data.push(...XMLDomToData(children[i]));
                }
            }
            break;
        default:
            break;
    }
    return data;
};

const fieldToElement = (field) => {
    const name = field.getAttribute('name');
    const text = field.childNodes[0].data;
    const element = {};
    switch (name) {
        case 'NUM':
        case 'DISTANCE':
        case 'ANGLE':
            element.type = NUMBER;
            element.value = flag * parseInt(text);
            flag = 1;
            break;
        case 'TEXT':
            element.type = TEXT;
            element.value = text;
            break;
        case 'OP':
            element.type = SYMBOL;
            element.value = SYMBOL_TYPES_TEXT.indexOf(text);
            break;
        case 'COLOR':
            element.type = COLOR;
            element.value = text;
            break;
        case 'TIMES':
            return parseInt(text);
        default:
            break;
    }
    return element;
}

const XMLDomToData = (XMLDom) => {
    const data = [];
    switch (XMLDom.tagName) {
        case 'block':
            return data.concat(blockToData(XMLDom));
        case 'field':
            return data.concat(fieldToElement(XMLDom));
        default:
            break;
    }
    const children = XMLDom.childNodes;
    if (children) {
        for (let i = 0; i < children.length; i++) {
            data.push(...XMLDomToData(children[i]));
        }
    }
    return data;
}

const XMLToData = (xml) => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const XMLDom = doc.childNodes[0];
    const data = [];
    // for (let i = 0; i < XMLDom.childNodes.length; i++) {
    //     data.push(...XMLDomToData(XMLDom.childNodes[i]));
    // }
    data.push(...XMLDomToData(XMLDom.childNodes[0]));
    return data;
}

module.exports = {
    dataToBlocks, processData, recoverData, dataToTree, treeToXML, TreeNodeToCode, XMLToData
}
