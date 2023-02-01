'use strict';

const express = require('express');
const router = express.Router();

const SampleController = require('../controllers/SampleController');
const sampleController = new SampleController();
const sampleMiddleware = require('../middlewares/SampleMiddleware');

router.get('/api/sample', sampleMiddleware, sampleController.seonghun);

const outputRouter = require('./OutputRouter');
router.use('/', outputRouter);

module.exports = router;
