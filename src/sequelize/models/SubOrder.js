'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubOrder extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'orderId' });
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  SubOrder.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName: 'SubOrder',
  });
  return SubOrder;
};