'use strict';

const ProductsRepository = require('../repositories/ProductsRepository');
const { Product } = require('../sequelize/models');

class ProductsService {
  productsTable = new ProductsRepository(Product);

  getRandomProducts = async () => {
    try {
      return await this.productsTable.getRandomProducts();
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패' };
    }
  };
  getProductsList = async () => {
    try {
      return await this.productsTable.getProductsList();
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패' };
    }
  };
  getProductDetails = async (productId) => {
    try {
      return await this.productsTable.getProduct(productId);
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패' };
    }
  };
}

module.exports = ProductsService;
