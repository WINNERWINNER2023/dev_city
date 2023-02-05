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
}

module.exports = ProductsController;
