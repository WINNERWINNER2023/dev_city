'use strict';

require('dotenv').config();
const OrdersRepository = require('../repositories/OrdersRepository');
const { Order } = require('../sequelize/models');

const PaginationUtil = require('../utils/PaginationUtil');

class OrdersService {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  ordersRepository = new OrdersRepository(Order);

  adminGetOrders = async (page) => {
    try {
      const orders = await this.ordersRepository.adminGetOrders(page);
      if (orders.length === 0) {
        return { code: 404, message: '해당하는 주문 목록 없음' };
      }
      const ordersCountAll = await this.ordersRepository.adminGetOrdersCountAll();
      const paginationUtil = new PaginationUtil(page, ordersCountAll, this.pageLimit, this.sectionLimit);
      return { code: 200, data: orders, pagination: paginationUtil.render() };
    } catch (err) {
      return { code: 500, message: '주문 목록 조회 실패' };
    }
  };

  adminGetSubOrders = async (page) => {
    try {
      const subOrders = await this.ordersRepository.adminGetSubOrders(page);
      if (subOrders.length === 0) {
        return { code: 404, message: '해당하는 상세주문 목록 없음' };
      }
      const subOrdersCountAll = await this.ordersRepository.adminGetSubOrdersCountAll();
      const paginationUtil = new PaginationUtil(page, subOrdersCountAll[0].countAll, this.pageLimit, this.sectionLimit);
      return { code: 200, data: subOrders, pagination: paginationUtil.render() };
    } catch (err) {
      return { code: 500, message: '상세주문 목록 조회 실패' };
    }
  };
}

module.exports = OrdersService;
