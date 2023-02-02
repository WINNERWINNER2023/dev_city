'use strict';

const express = require('express');
const router = express.Router();

const SampleController = require('../controllers/SampleController');
const sampleController = new SampleController();
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/api/sample', authMiddleware, sampleController.seonghun);

const outputRouter = require('./OutputRouter');
router.use('/', outputRouter);

module.exports = router;
