'use strict';

const CustomersService = require('../services/CustomersService');

class CustomersController {
  customersService = new CustomersService();

  adminGetCustomers = async (req, res) => {
    const page = parseInt(req.query.p || 1);
    const response = await this.customersService.adminGetCustomers(page);
    return res
      .status(response.code)
      .json(response.code === 200 ? { data: response.data, pagination: response.pagination } : { message: response.message });
  };
}

module.exports = CustomersController;
