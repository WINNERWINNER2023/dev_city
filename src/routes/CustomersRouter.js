'use strict';

const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/CustomersController');
const customersController = new CustomersController();

router.post('/', customersController.registerCustomer);
router.get('/', customersController.findOneCustomer);
router.put('/', customersController.changeCustomer);
router.put('/coin', customersController.addCustomerCoin);
router.delete('/', customersController.deleteCustomer);

module.exports = router;
