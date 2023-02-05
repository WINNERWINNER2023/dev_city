'use strict';

const express = require('express');
const router = express.Router();

const AdminsRouter = require('./AdminsRouter');
const outputRouter = require('./OutputRouter');
const customersRouter = require('./CustomersRouter');

router.use('/api/admin', AdminsRouter);
router.use('/', outputRouter);
router.use('/api/customers', customersRouter);

module.exports = router;
