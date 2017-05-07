'use strict'
const express = require('express');
const router = express.Router();

const { dataToBlocks, preProcesser, dataToTree, treeToXMLDom, TreeNodeToCode } = require('./convert');

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

const fake = [{
    type: OUTPUT,
    value: 2
}, {
    type: TEXT,
    value: '你好'
}, {
    type: IF
}, {
    type: INPUT,
    value: 0
}, {
    type: SYMBOL,
    value: 4
}, {
    type: NUMBER,
    value: 30
}, {
    type: START
}, {
    type: OUTPUT,
    value: 3
}, {
    type: COLOR,
    value: '#ff0000'
}, {
    type: ELSE
}, {
    type: OUTPUT,
    value: 3
}, {
    type: COLOR,
    value: '#33ff33'
}, {
    type: END
}, {
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
    value: 4
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

router.post('/dock', (req, res) => {
    const blocks = dataToBlocks(fake);
    const ripeData = preProcesser(fake);
    const root = dataToTree(ripeData);
    const XMLDom = treeToXMLDom(root);
    const code = TreeNodeToCode(root);
    console.log(blocks);
    console.log(code);
    res.status(200).json({
        blocks,
        XMLDom,
        code
    });
});

router.get('/input_distance', (req, res) => {
    const distance = (Math.random() * 100).toFixed(2);
    res.status(200).json(distance);
});

router.get('/input_temperature', (req, res) => {
    const temperature = (Math.random() * 80 - 30).toFixed(1);
    res.status(200).json(temperature);
});

module.exports = router;
