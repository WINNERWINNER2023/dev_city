'use strict';

const express = require('express');
const router = express.Router();

const AdminsController = require('../controllers/AdminsController');
const adminsController = new AdminsController();

router.post('/register', adminsController.register);
router.post('/login', adminsController.login);

module.exports = router;
