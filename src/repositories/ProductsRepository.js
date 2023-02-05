'use strict';
const { Op } = require('sequelize');
const { Sequelize } = require('../sequelize/models');

class ProductsRepository {
  constructor(model) {
    this.model = model;
  }

  getRandomProducts = async () => {
    return await this.model.findAll({
      raw: true,
      where: { count: { [Op.gt]: 0 } },
      order: [Sequelize.fn('RAND')],
      limit: 3,
    });
  };
  getProductsList = async () => {
    return await this.model.findAll({
      raw: true,
      where: { count: { [Op.gt]: 0 } },
    });
  };
  getProduct = async (productId) => {
    return await this.model.findOne({
      rew: true,
      where: { id: productId },
    });
  };
}

module.exports = ProductsRepository;
