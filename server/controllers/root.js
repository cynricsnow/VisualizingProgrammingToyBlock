'use strict'
const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.sendFile(`${ROOT}/public/index.html`);
})

module.exports = router;
