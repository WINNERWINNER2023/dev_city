'use strict';

const ProductsService = require('../services/ProductsService');

class ProductsController {
  productsService = new ProductsService();

  createProduct = async (req, res) => {
    const { name, contents, price, count, startUse, endUse } = req.body;
    const imagePath = req.files.length > 0 ? req.files[0].filename : null;
    const productInfo = {
      name,
      contents,
      startUse,
      endUse,
      imagePath,
      price: parseInt(price),
      count: parseInt(count),
    }
    const response = await this.productsService.createProduct(productInfo);
    return res.status(response.code).json({ message: response.message });
  }

  getProducts = async (req, res) => {
    const response = await this.productsService.getProducts(req.get('Host'));
    return res.status(response.code).json(response.data ? { data: response.data } : { message: response.message });
  }
}

module.exports = ProductsController;
