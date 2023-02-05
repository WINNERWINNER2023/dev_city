'use strict';

require('dotenv').config();
const { Op } = require('sequelize');
const { Sequelize } = require('../sequelize/models');
const { sequelize } = require('../sequelize/models/index');

class ProductsRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

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

  createProduct = async (productInfo) => {
    await this.model.create({
      name: productInfo.name,
      contents: productInfo.contents,
      startUse: productInfo.startUse,
      endUse: productInfo.endUse,
      imagePath: productInfo.imagePath,
      price: productInfo.price,
      count: productInfo.count,
    });
  };

  adminGetProducts = async (page) => {
    return await this.model.findAll({
      raw: true,
      order: [['id', 'DESC']],
      offset: (page - 1) * this.pageLimit,
      limit: this.pageLimit,
    });
  };

  adminGetProductsCountAll = async () => {
    return await this.model.findOne({
      raw: true,
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'countAll']],
    });
  };

  adminGetProduct = async (productId) => {
    return await this.model.findByPk(productId);
  };
}

module.exports = ProductsRepository;
