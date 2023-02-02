'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.SubOrder, { foreignKey: 'productId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    contents: DataTypes.STRING,
    startUse: DataTypes.DATE,
    endUse: DataTypes.DATE,
    imagePath: DataTypes.STRING,
    price: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};