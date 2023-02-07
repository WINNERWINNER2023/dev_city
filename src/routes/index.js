'use strict';

const express = require('express');
const router = express.Router();

const OutputRouter = require('./OutputRouter');
const CustomersRouter = require('./CustomersRouter');
const AdminsRouter = require('./AdminsRouter');
const ProductsRouter = require('./ProductsRouter');
// const ChatsRouter = require('./ChatsRouter');

const CustomersOutputRouter = require('./CustomersOutputRouter');
const AdminsOutputRouter = require('./AdminsOutputRouter');

router.use('/api/customers', CustomersRouter);
router.use('/api/admins', AdminsRouter);
router.use('/api/products', ProductsRouter);
// router.use('/api/chats', ChatsRouter);

router.use('/', OutputRouter);
router.use('/customers', CustomersOutputRouter);
router.use('/admins', AdminsOutputRouter);

router.get('/*', (_, res) => res.redirect('/'));

module.exports = router;
