'use strict';

const CustomersService = require('../services/CustomersService');

class CustomersController {
  customersService = new CustomersService();
}

module.exports = CustomersController;
