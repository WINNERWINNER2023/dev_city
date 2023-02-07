'use strict';

const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/CustomersController');
const customersController = new CustomersController();

const customersAuthMiddleware = require('../middlewares/customersAuthMiddleware');

router.post('/', customersController.registerCustomer);
router.post('/login', customersController.loginCustomer);

router.get('/', customersAuthMiddleware, customersController.findOneCustomer);
router.put('/', customersAuthMiddleware, customersController.changeCustomer);
router.put('/coin', customersAuthMiddleware, customersController.addCustomerCoin);
router.delete('/', customersAuthMiddleware, customersController.deleteCustomer);

module.exports = router;
