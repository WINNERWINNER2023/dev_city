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
    customerInfo.coin -= totalPrice;
    if(customerInfo.coin < 0){
      throw new Error("사용자의 코인이 부족합니다.")
    }
  };
};

module.exports = CustomersRepository;