'use strict';

const ProductsService = require('../services/ProductsService');

class ProductsController {
  productsService = new ProductsService();

  getRandomProducts = async (req, res) => {
    const randomProducts = await this.productsService.getRandomProducts();
    return res.status(200).json(randomProducts);
  };

  getProductsList = async (req, res) => {
    const products = await this.productsService.getProductsList();
    return res.status(200).json(products);
  };

  getProductDetails = async (req, res) => {
    const { productId } = req.params;
    const product = await this.productsService.getProductDetails(Number(productId));
    if (product.code == 500) {
      return res.status(500).json(product);
    }

    return res.status(200).json(product);
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
    const response = await this.productsService.adminGetProducts(req.get('Host'), page);
    return res
      .status(response.code)
      .json(response.code === 200 ? { data: response.data, pagination: response.pagination } : { message: response.message });
  };

  adminGetProduct = async (req, res) => {
    const { productId } = req.params;
    if (isNaN(productId)) {
      return res.status(400).json({ message: '잘못된 요청' });
    }
    const response = await this.productsService.adminGetProduct(req.get('Host'), parseInt(productId));
    return res
      .status(response.code)
      .json(response.code === 200 ? { data: response.data } : { message: response.message });
  };
}

module.exports = ProductsController;
