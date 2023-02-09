'use strict';

const express = require('express');
const router = express.Router();

const CustomersController = require('../controllers/CustomersController');
const customersController = new CustomersController();

const customersAuthMiddleware = require('../middlewares/customersAuthMiddleware');

router.get('/', customersAuthMiddleware, customersController.findOneCustomer);
router.post('/', customersController.registerCustomer);
router.put('/', customersAuthMiddleware, customersController.changeCustomer);
router.delete('/', customersAuthMiddleware, customersController.deleteCustomer);

router.post('/login', customersController.loginCustomer);

router.put('/coin', customersAuthMiddleware, customersController.addCustomerCoin);

module.exports = router;
