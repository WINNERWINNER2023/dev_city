'use strict';

const express = require('express');
const router = express.Router();

const OutputRouter = require('./OutputRouter');
const CustomersRouter = require('./CustomersRouter');
const AdminsRouter = require('./AdminsRouter');
const ProductsRouter = require('./ProductsRouter');

const AdminsOutputRouter = require('./AdminsOutputRouter');

router.use('/api/customers', CustomersRouter);
router.use('/api/admins', AdminsRouter);
router.use('/api/products', ProductsRouter);

router.use('/', OutputRouter);
router.use('/admins', AdminsOutputRouter);
router.get('/*', (req, res) => res.redirect('/'));

module.exports = router;
