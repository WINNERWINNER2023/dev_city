'use strict';

require('dotenv').config();
const { sequelize } = require('../sequelize/models/index');

class CustomersRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

  constructor(model) {
    this.model = model;
  }

  adminGetCustomers = async (page) => {
    return await this.model.findAll({
      raw: true,
      attributes: ['id', 'email', 'nickname', 'phone', 'coin', 'createdAt', 'updatedAt'],
      order: [['id', 'DESC']],
      offset: (page - 1) * this.pageLimit,
      limit: this.pageLimit,
    });
  };

  adminGetCustomersCountAll = async () => {
    return await this.model.findOne({
      raw: true,
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'countAll']],
    });
  };
};

module.exports = CustomersRepository;