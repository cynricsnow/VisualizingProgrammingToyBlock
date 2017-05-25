'use strict'
const express = require('express');
const router = express.Router();

const { bytesToData, dataToBlocks, processData, recoverData, dataToTree, treeToXML, TreeNodeToCode, XMLToData } = require('../common/convert');

router.post('/dock', (req, res) => {
    const data = bytesToData(req.body.bytes);
    const inputs = req.body.inputs;
    const ripeData = processData(data);
    const blocks = dataToBlocks(ripeData);
    const root = dataToTree(ripeData);
    const xml = treeToXML(root);
    const code = TreeNodeToCode(root);
    res.status(200).json({
        blocks,
        xml,
        code,
        inputs
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

module.exports = router;
