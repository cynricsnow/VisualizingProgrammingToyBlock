'use strict'
const express = require('express');
const router = express.Router();

const { fake, dataToBlocks, processData, recoverData, dataToTree, treeToXML, TreeNodeToCode, XMLToData } = require('../common/convert');

router.post('/dock', (req, res) => {
    const ripeData = processData(fake);
    const blocks = dataToBlocks(ripeData);
    const root = dataToTree(ripeData);
    const xml = treeToXML(root);
    const code = TreeNodeToCode(root);
    res.status(200).json({
        blocks,
        xml,
        code
    });
});

router.post('/update', (req, res) => {
    const data = XMLToData(req.body.xml);
    const root = dataToTree(data);
    const code = TreeNodeToCode(root);
    const blocks = dataToBlocks(data);
    res.status(200).json({
        blocks,
        code
    });
})

router.get('/input_distance', (req, res) => {
    const distance = (Math.random() * 100).toFixed(2);
    res.status(200).json(distance);
});

router.get('/input_temperature', (req, res) => {
    const temperature = (Math.random() * 80 - 30).toFixed(1);
    res.status(200).json(temperature);
});

module.exports = router;
