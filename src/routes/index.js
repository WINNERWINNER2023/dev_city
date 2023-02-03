'use strict';

const express = require('express');
const router = express.Router();

const AdminsRouter = require('./AdminsRouter');
const outputRouter = require('./OutputRouter');

router.use('/api/admin', AdminsRouter);
router.use('/', outputRouter);

module.exports = router;
