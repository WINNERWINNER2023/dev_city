'use strict';

require('dotenv').config();
const { sequelize } = require('../sequelize/models/index');

class CustomersRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  addCoin = parseInt(process.env.ADD_AMOUNT_CUSTOMER_COIN);

  constructor(model) {
    this.model = model;
  }

  createCustomer = async (email, nickname, password, phone) => {
    return await this.model.create({ email, nickname, password, phone });
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

  deleteCustomer = async (id) => {
    return await this.model.destroy({ where: { id } });
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

  getCustomer = async (customerId) => {
    return await this.model.findOne({
      raw : true,
      where: { customerId }
    })
  }

  customerPayment = async (transaction ,customerId, totalPrice) => {
    const customerInfo = await this.model.findOne({
      where: { id: customerId }
    },
    { transaction });

    if(!customerInfo){
      throw new Error("사용자 정보가 존재하지 않습니다.");
    }
    console.log(customerInfo.coin)
    customerInfo.coin -= totalPrice;
    console.log(customerInfo.coin)
    if(customerInfo.coin < 0){
      throw new Error("사용자의 코인이 부족합니다.")
    }
    await customerInfo.save({ transaction })
  };
};

module.exports = CustomersRepository;
