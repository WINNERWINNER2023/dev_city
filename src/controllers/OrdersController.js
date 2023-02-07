'use strict';

const OrdersService = require('../services/OrdersService');

class OrdersController {
  ordersService = new OrdersService();

  adminGetOrders = async (req, res) => {
    const page = parseInt(req.query.p || 1);
    const response = await this.ordersService.adminGetOrders(page);
    return res
      .status(response.code)
      .json(response.code === 200 ? { data: response.data, pagination: response.pagination } : { message: response.message });
  };

  adminGetSubOrders = async (req, res) => {
    const page = parseInt(req.query.p || 1);
    const response = await this.ordersService.adminGetSubOrders(page);
    return res
      .status(response.code)
      .json(response.code === 200 ? { data: response.data, pagination: response.pagination } : { message: response.message });
  };
}

module.exports = OrdersController;
