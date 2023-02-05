'use strict';

require('dotenv').config();
const { sequelize } = require('../sequelize/models/index');

class ProductsRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

  constructor(model) {
    this.model = model;
  }

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
  }

  adminGetProductsCountAll = async () => {
    return await this.model.findOne({
      raw: true,
      attributes: [ 
        [sequelize.fn('COUNT', sequelize.col('*')), 'countAll'], 
      ]
    });
  }
}

module.exports = ProductsRepository;