'use strict';

const ProductsService = require('../services/ProductsService');

class ProductsController {
  productsService = new ProductsService();

  getRandomProducts = async (req, res) => {
    const randomProducts = await this.productsService.getRandomProducts();
    return res.status(randomProducts.code).json(randomProducts.data);
  };

  getProductsList = async (req, res) => {
    const { page } = req.params;
    const products = await this.productsService.getProductsList(page);
    return res.status(products.code).json(products.data);
  };

  getProductDetails = async (req, res) => {
    const { productId } = req.params;
    const product = await this.productsService.getProductDetails(Number(productId));
    console.log(product);
    if (product.code === 500) {
      return res.status(product.code).json(product);
    }

    return res.status(product.code).json(product.data);
  };

  getOrderedProductsByCustomerId = async (req, res) => {
    // const customerId = req.body.id // thunder client 실험용
    const customerId = 1;
    const customerProducts = await this.productsService.getProductsListByCustomerId(customerId);
    if (customerProducts.code === 500) {
      return res.status(customerProducts.code).json(customerProducts.message);
    }
    return res.status(200).json(customerProducts.data);
  };

  createOrder = async (req, res) => {
    // const customer = req.customerInfo;
    const customer = {
      id: 1,
      account: 'test1',
    };
    const orderProducts = req.body.cart;
    const createOrder = await this.productsService.createOrder(customer, orderProducts);

    if (createOrder.code === 500) {
      return res.status(createOrder.code).json(createOrder.message);
    }
    return res.status(createOrder.code).json(createOrder.message);
  };

  createProduct = async (req, res) => {
    const { name, contents, startUse, endUse, price, count } = req.body;
    const imagePath = req.files.length > 0 ? req.files[0].filename : null;
    const productInfo = {
      name,
      contents,
      startUse,
      endUse,
      imagePath,
      price: price,
      count: count,
    };
    const response = await this.productsService.createProduct(productInfo);
    return res.status(response.code).json({ message: response.message });
  };

  adminGetProducts = async (req, res) => {
    const page = parseInt(req.query.p || 1);
    const { filter, keyword } = req.query;
    const response = await this.productsService.adminGetProducts(`${req.protocol}://${req.get('Host')}`, page, filter, keyword);

    return res.status(response.code).json(
      response.code === 200 ? 
      { 
        data: response.data, 
        pagination: response.pagination, 
        search: { filter, keyword } 
      } : 
      { message: response.message });
  };

  adminGetProduct = async (req, res) => {
    const { productId } = req.params;
    if (isNaN(productId)) {
      return res.status(400).json({ message: '잘못된 요청' });
    }
    const response = await this.productsService.adminGetProduct(`${req.protocol}://${req.get('Host')}`, parseInt(productId));
    return res.status(response.code).json(response.code === 200 ? { data: response.data } : { message: response.message });
  };

  updateProduct = async (req, res) => {
    const { productId } = req.params;
    if (isNaN(productId)) {
      return res.status(400).json({ message: '잘못된 요청' });
    }
    const { name, contents, startUse, endUse, price, count } = req.body;
    const imagePath = req.files.length > 0 ? req.files[0].filename : null;
    const productInfo = {
      id: productId,
      name,
      contents,
      startUse,
      endUse,
      imagePath,
      price: price,
      count: count,
    };
    const response = await this.productsService.updateProduct(productInfo);
    return res.status(response.code).json({ message: response.message });
  };

  deleteProduct = async (req, res) => {
    const { productId } = req.params;
    if (isNaN(productId)) {
      return res.status(400).json({ message: '잘못된 요청' });
    }
    const response = await this.productsService.deleteProduct(parseInt(productId));
    return res.status(response.code).json({ message: response.message });
  };
}

module.exports = ProductsController;
