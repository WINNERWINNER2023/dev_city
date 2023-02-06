'use strict';

const express = require('express');
const router = express.Router();

const CustomersOutputController = require('../controllers/AdminsOutputController');
const customersOutputController = new CustomersOutputController();

router.post('/', customersOutputController.registerCustomer);
router.get('/', customersOutputController.findOneCustomer);
router.put('/', customersOutputController.changeCustomer);
router.put('/coin', customersOutputController.addCustomerCoin);
router.delete('/', customersOutputController.deleteCustomer);
router.post('/login', customersOutputController.loginCustomer);

module.exports = router;
