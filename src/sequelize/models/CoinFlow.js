'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoinFlow extends Model {
    static associate(models) {
      this.belongsTo(models.Customer, { foreignKey: 'customerId' });
      this.belongsTo(models.Order, { foreignKey: 'orderId' });
    }
  }
  CoinFlow.init({
    customerId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    changedAmount: DataTypes.INTEGER,
    remainedAmount: DataTypes.INTEGER,
    changedReason: DataTypes.STRING
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName: 'CoinFlow',
  });
  return CoinFlow;
};