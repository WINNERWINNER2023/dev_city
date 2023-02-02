'use strict';

const CustomersRepository = require('../repositories/CustomersRepository');
const { Customer } = require('../sequelize/models');

class CustomersService {
  customersRepository = new CustomersRepository(Customer);
}

module.exports = CustomersService;
