'use strict';

require('dotenv').config();
const ProductsRepository = require('../repositories/ProductsRepository');
const { Product } = require('../sequelize/models');

const PaginationUtil = require('../utils/PaginationUtil');

class ProductsService {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  productsRepository = new ProductsRepository(Product);

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

  adminGetProduct = async (host, productId) => {
    try {
      const product = await this.productsRepository.adminGetProduct(productId);
      if (!product) {
        return { code: 404, message: '해당하는 상품 없음' };
      }
      product.imagePath = `${host}/${process.env.UPLOADS_PATH}/products/${product.imagePath}`;

      return { code: 200, data: product };
    } catch (err) {
      return { code: 500, message: '상품 상세 조회 실패' };
    }
  };

  updateProduct = async (productInfo) => {
    try {
      await this.productsRepository.updateProduct(productInfo);
      return { code: 200, message: '상품 수정 완료' };
    } catch (err) {
      return { 
        code: err.code ? err.code : 500, 
        message: err.code ? err.message : '상품 수정 실패' 
      };
    }
  };

  deleteProduct = async (productId) => {
    try {
      await this.productsRepository.deleteProduct(productId);
      // return { code: 204, message: '상품 삭제 완료' }; // 클라이언트에서 결과를 받지 못하는 현상 때문에 200으로 사용
      return { code: 200, message: '상품 삭제 완료' };
    } catch (err) {
      return { code: 500, message: '상품 삭제 실패' };
    }
  };
}

module.exports = ProductsService;
