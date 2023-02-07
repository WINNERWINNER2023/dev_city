'use strict';

require('dotenv').config();
const chalk = require('chalk');
const ProductsRepository = require('../repositories/ProductsRepository');
const { Product, Order, SubOrder, Customer } = require('../sequelize/models');

const PaginationUtil = require('../utils/PaginationUtil');

class ProductsService {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  productsRepository = new ProductsRepository(Product);
  ordersRepository = new ProductsRepository(Order);
  subOrdersRepository = new ProductsRepository(SubOrder);
  customersRepository = new ProductsRepository(Customer);

  getRandomProducts = async () => {
    try {
      randomProducts = await this.productsRepository.getRandomProducts();
      return { code: 200, data: randomProducts };
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패1' };
    }
  };

  getProductsList = async (page) => {
    try {
      let pageCount = 0;
      if (page > 1) {
        pageCount = 3 * (page - 1);
      }
      const prdoductsList = await this.productsRepository.getProductsList(pageCount);
      if (!prdoductsList.length) {
        return { code: 200, message: '마지막 상품입니다.' };
      }
      return { code: 200, data: prdoductsList };
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패2' };
    }
  };

  getProductDetails = async (productId) => {
    try {
      const product = await this.productsRepository.getProduct(productId);

      return { code: 200, data: product };
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패3' };
    }
  };

  getProductsListByCustomerId = async (customerId) => {
    try {
      const customerOrders = await this.ordersRepository.getOrderListByCustomerId(customerId);
      console.log(customerOrders)
      let customerProducts = []
      for(let i = 0; i < customerOrders.length; i++) {
        let orderId = customerOrders[i].id
        console.log(orderId)
        let products = await this.subOrdersRepository.getSubOrderListByOrderId(orderId)
        console.log(products)
        for(let j = 0; j < products.length; j++){
          customerProducts.push(products[j])
        }
        console.log(customerProducts)
      }
      return { code: 200, data: customerProducts };
    } catch (err) {
      return { code: 500, message: '데이터 가져오기 실패4' };
    }
  };

  createOrder = async (customer, orderProducts) => {
    try {
      const customerId = customer.id;
      let cartList = [];
      for (let i = 0; i < orderProducts.length; i++) {
        cartList.push(orderProducts[i].id);
      }
      const productsList = [];
      for (let i = 0; i < cartList.length; i++) {
        const product = await this.productsRepository.getProduct(cartList[i]);
        productsList.push(product);
      }
      let totalPrice = 0;
      productsList.map(function (product) {
        return (totalPrice += product.price);
      });
      const paymentPrice = totalPrice * -1;
      const order = await this.ordersRepository.createOrder(customerId);

      for (let i = 0; i < cartList.length; i++) {
        const product = parseInt(cartList[i]);
        const orderId = order.dataValues.id;
        console.log(order.dataValues.id);
        await this.subOrdersRepository.createSubOrder(orderId, product);
      }
      await this.customersRepository.customerPayment(customerId, paymentPrice);

      return { code: 201, message: '결제 완료' };
    } catch (err) {
      console.log(err.message);
      return { code: 501, message: '결제 실패' };
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
        message: err.code ? err.message : '상품 수정 실패',
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
