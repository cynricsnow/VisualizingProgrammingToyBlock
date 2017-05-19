'use strict'
const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
const rootRouter = require('./root.js');

router.use('/api', apiRouter);
router.use(rootRouter);

module.exports = router;
