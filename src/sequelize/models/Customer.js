'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'customerId' });
      this.hasMany(models.CoinFlow, { foreignKey: 'customerId' });
    }
  }
  Customer.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    phone: DataTypes.STRING,
    coin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};