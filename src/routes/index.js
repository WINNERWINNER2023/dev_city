'use strict';

const express = require('express');
const router = express.Router();

const ProductsRouter = require('./ProductsRouter');

const AdminsRouter = require('./AdminsRouter');
const outputRouter = require('./OutputRouter');

router.use('/api/admin', AdminsRouter);
router.use('/', outputRouter);
router.use('/products', ProductsRouter);

module.exports = router;
