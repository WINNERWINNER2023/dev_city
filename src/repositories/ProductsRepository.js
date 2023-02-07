'use strict';

require('dotenv').config();
const { Op, or } = require('sequelize');
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

  getProductsList = async (pageCount) => {
    return await this.model.findAll({
      raw: true,
      where: { count: { [Op.gt]: 0 } },
      offset: pageCount,
      limit: 3,
    });
  };

  getProduct = async (productId) => {
    return await this.model.findOne({
      raw: true,
      where: { id: productId },
    });
  };

  getOrderListByCustomerId = async (customerId) => {
    return await this.model.findAll({
      raw : true,
      where : { customerId : customerId }
    })
  }

  getSubOrderListByOrderId = async (orderId) => {
    return await this.model.findAll({
      raw: true,
      where: { orderId : orderId},
    });
  };

  createOrder = async (customerId) => {
    return await this.model.create({
      customerId: customerId,
      status: '결제 완료',
    });
  };

  createSubOrder = async (orderId, product) => {
    await this.model.create({
      orderId: orderId,
      productId: product,
    });
  };

  customerPayment = async (customerId, paymentPrice) => {
    await this.model.increment({ coin: paymentPrice }, { where: { id: customerId } });
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

  adminGetProducts = async (page, filter, keyword) => {
    const obj = {
      raw: true,
      order: [['id', 'DESC']],
      offset: (page - 1) * this.pageLimit,
      limit: this.pageLimit,
    };
    switch(filter) {
      case 'name': 
        obj.where = { name: { [Op.like]: `%${keyword}%`, } };
        break;
    };
    return await this.model.findAll(obj);
  };

  adminGetProductsCountAll = async () => {
    return await this.model.findOne({
      raw: true,
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'countAll']],
    });
  };

  adminGetProductsCountAll = async (filter, keyword) => {
    const obj = {
      raw: true,
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'countAll']],
    };
    switch(filter) {
      case 'name': 
        obj.where = { name: { [Op.like]: `%${keyword}%`, } };
        break;
    };
    return await this.model.findOne(obj);
  };

  adminGetProduct = async (productId) => {
    return await this.model.findByPk(productId);
  };

  updateProduct = async (productInfo) => {
    const product = await this.model.findByPk(productInfo.id);
    if (!product) {
      const err = new Error('해당하는 상품 없음');
      err.code = 404;
      throw err;
    }
    product.name = productInfo.name;
    product.contents = productInfo.contents;
    product.startUse = productInfo.startUse;
    product.endUse = productInfo.endUse;
    if (productInfo.imagePath) {
      product.imagePath = productInfo.imagePath;
    }
    product.price = productInfo.price;
    product.count = productInfo.count;
    await product.save();
  };

  deleteProduct = async (productId) => {
    await this.model.destroy({
      where: { id: productId },
    });
  };
}

module.exports = ProductsRepository;
