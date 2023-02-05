'use strict';

require('dotenv').config();
const ProductsRepository = require('../repositories/ProductsRepository');
const { Product } = require('../sequelize/models');

const PaginationUtil = require('../utils/PaginationUtil');

class ProductsService {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  productsRepository = new ProductsRepository(Product);

  createProduct = async (productInfo) => {
    try {
      await this.productsRepository.createProduct(productInfo);
      return { code: 201, message: '상품 등록 완료' };
    } catch (err) {
      return { code: 500, message: '상품 등록 실패' };
    }
  };

  adminGetProducts = async (host, page) => {
    try {
      const products = (await this.productsRepository.adminGetProducts(page)).map((product) => {
        product.imagePath = `${host}/${process.env.UPLOADS_PATH}/products/${product.imagePath}`;
        return product;
      });
      if (products.length === 0) {
        return { code: 404, message: '해당하는 상품 목록 없음' };
      }

      const productsCountAll = await this.productsRepository.adminGetProductsCountAll();
      const paginationUtil = new PaginationUtil(page, productsCountAll.countAll, this.pageLimit, this.sectionLimit);
      return { code: 200, data: products, pagination: paginationUtil.render() };
    } catch (err) {
      return { code: 500, message: '상품 목록 조회 실패' };
    }
  };

  getRandomProducts = async () => {
    try {
      return await this.productsRepository.getRandomProducts();
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패' };
    }
  };
  getProductsList = async () => {
    try {
      return await this.productsRepository.getProductsList();
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패' };
    }
  };
  getProductDetails = async (productId) => {
    try {
      return await this.productsRepository.getProduct(productId);
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패' };
    }
  };
}

module.exports = ProductsService;
