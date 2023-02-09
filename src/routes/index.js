'use strict';

const express = require('express');
const router = express.Router();

const OutputRouter = require('./OutputRouter');
const CustomersRouter = require('./CustomersRouter');
const AdminsRouter = require('./AdminsRouter');
const ProductsRouter = require('./ProductsRouter');

const CustomersOutputRouter = require('./CustomersOutputRouter');
const AdminsOutputRouter = require('./AdminsOutputRouter');

router.use('/api/customers', CustomersRouter);
router.use('/api/products', ProductsRouter);
router.use('/api/admins', AdminsRouter);

router.use('/customers', CustomersOutputRouter);
router.use('/admins', AdminsOutputRouter);
router.use('/', OutputRouter);

router.get('/*', (_, res) => res.redirect('/'));

module.exports = router;
