'use strict';

class CustomersRepository {
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
    customerId = 60;
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
  changeCustomer = async (email, nickname, password, phone, customerId) => {
    customerId = 60;
    return await this.model.update({ email, nickname, password, phone }, { where: { id: customerId } });
  };
  addCustomerCoin = async (customerId) => {
    customerId = 60;
    return await this.model.increment({ coin: 10000 }, { where: { id: customerId } });
  };
  deleteCustomer = async () => {
    customerId = 60;
    return await this.model.destroy({ where: { id: customerId } });
  };
}
module.exports = CustomersRepository;
