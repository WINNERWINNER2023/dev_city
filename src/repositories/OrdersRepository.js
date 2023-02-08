'use strict';

require('dotenv').config();
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../sequelize/models/index');

class OrdersRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

  constructor(model) {
    this.model = model;
    this.sequelize = sequelize;
    this.QueryTypes = QueryTypes;
  }

  adminGetOrders = async (page) => {
    const query = `SELECT 
                    s.id AS subOrderId, 
                    o.id AS orderId, 
                    o.status, 
                    o.customerId, 
                    p.name AS productName, 
                    p.startUse, 
                    p.endUse, 
                    p.price, 
                    p.count,
                    s.createdAt AS orderedAt
                  FROM SubOrders AS s
                  INNER JOIN Orders AS o 
                    ON s.orderId = o.id
                  INNER JOIN Products AS p 
                    ON s.productId = p.id
                  ORDER BY s.id DESC
                  LIMIT ?, ?
                  ;`;
    return await this.sequelize.query(query, {
      type: this.QueryTypes.SELECT,
      replacements: [(page - 1) * this.pageLimit, this.pageLimit],
    });
  };

  adminGetOrdersCountAll = async () => {
    const query = `SELECT 
                    count(s.id) AS countAll
                  FROM SubOrders AS s
                  INNER JOIN Orders AS o 
                  ON s.orderId = o.id
                  INNER JOIN Products AS p 
                  ON s.productId = p.id;
                  ;`;
    return await this.sequelize.query(query, {
      type: this.QueryTypes.SELECT,
    });
  };

  getOrderListByCustomerId = async (customerId) => {
    return await this.model.findAll({
      raw : true,
      where : { customerId : customerId }
    })
  }

  createOrder = async (transaction ,customerId) => {
    return await this.model.create({
      customerId: customerId,
      status: '결제 완료',
    },
    { transaction }
    );
  };
};

module.exports = OrdersRepository;