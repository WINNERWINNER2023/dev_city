'use strict';

const express = require('express');
const router = express.Router();

const CustomersOutputController = require('../controllers/CustomersOutputController');
const customersOutputController = new CustomersOutputController();

router.get('/', customersOutputController.main);
router.get('/register', customersOutputController.register);
router.get('/login', customersOutputController.login);
router.get('/mypage', customersOutputController.mypage);

module.exports = router;
