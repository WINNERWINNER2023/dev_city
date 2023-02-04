'use strict';

const express = require('express');
const router = express.Router();

const ProductsRouter = require('./ProductsRouter');

const SampleController = require('../controllers/SampleController');
const sampleController = new SampleController();
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/api/sample', authMiddleware, sampleController.seonghun);

const outputRouter = require('./OutputRouter');
router.use('/', outputRouter);
router.use('/products', ProductsRouter);

module.exports = router;
