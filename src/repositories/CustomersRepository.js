'use strict';

require('dotenv').config();
const { sequelize } = require('../sequelize/models/index');

class CustomersRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

  constructor(model) {
    this.model = model;
  }

  createCustomer = async (customerInfo, coin) => {
    return await this.model.create({
      email: customerInfo.email,
      nickname: customerInfo.nickname,
      password: customerInfo.password,
      phone: customerInfo.phone,
      coin,
    });
  };

  findOneCustomer = async (customerId) => {
    return await this.model.findOne({
      attributes: ['id', 'email', 'nickname', 'phone', 'coin'],
      where: { id: customerId },
    });
  };

  findCustomerByEmail = async (email) => {
    return await this.model.findOne({ where: { email } });
  };

  findCustomerByNickname = async (nickname) => {
    return await this.model.findOne({ where: { nickname } });
  };

  changeCustomer = async (customerInfo, customerId) => {
    return await this.model.update(
      { email: customerInfo.email, nickname: customerInfo.nickname, password: customerInfo.password, phone: customerInfo.phone },
      { where: { id: customerId } }
    );
  };

  addCustomerCoin = async (customerId) => {
    return await this.model.increment({ coin: 10000 }, { where: { id: customerId } });
  };

  deleteCustomer = async (customerId) => {
    return await this.model.destroy({ where: { id: customerId } });
  };

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
}

module.exports = CustomersRepository;
