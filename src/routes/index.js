'use strict';

const express = require('express');
const router = express.Router();

const ProductsRouter = require('./ProductsRouter');

const AdminsRouter = require('./AdminsRouter');
const AdminsOutputRouter = require('./AdminsOutputRouter');
const OutputRouter = require('./OutputRouter');

router.use('/api/products', ProductsRouter);
router.use('/api/admins', AdminsRouter);

router.use('/admins', AdminsOutputRouter);
router.use('/', OutputRouter);
router.get('/*', (req, res) => res.redirect('/'));

module.exports = router;
