'use strict';

require('dotenv').config();
const ProductsRepository = require('../repositories/ProductsRepository');
const { Product } = require('../sequelize/models');

class ProductsService {
  productsRepository = new ProductsRepository(Product);

  createProduct = async (productInfo) => {
    try {
      await this.productsRepository.createProduct(productInfo);
      return { code: 201, message: '상품 등록 완료' };
    } catch (err) {
      return { code: 500, message: '상품 등록 실패' };
    }
  }

  getProducts = async (host) => {
    try {
      const products = (await this.productsRepository.getProducts()).map((product) => {
        product.imagePath = `${host}/${process.env.UPLOADS_PATH}/products/${product.imagePath}`;
        return product;
      })
      return { code: 200, data: products };
    } catch (err) {
      return { code: 500, meesage: '상품 목록 조회 실패' };
    }
  }
}

module.exports = ProductsService;