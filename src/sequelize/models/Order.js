'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Customer, { foreignKey: 'customerId' });
      this.hasMany(models.SubOrder, { foreignKey: 'orderId' });
      this.hasMany(models.CoinFlow, { foreignKey: 'orderId' });
    }
  }
  Order.init({
    customerId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};