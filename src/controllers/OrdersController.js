'use strict';

const OrdersService = require('../services/OrdersService');

class OrdersController {
  ordersService = new OrdersService();
}

module.exports = OrdersController;
