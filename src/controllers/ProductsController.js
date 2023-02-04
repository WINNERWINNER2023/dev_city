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

  adminGetProducts = async (req, res) => {
    const page = parseInt(req.query.p || 1);
    const response = await this.productsService.adminGetProducts(req.get('Host'), page);
    return res.status(response.code).json(
      response.code === 200 ? 
      { data: response.data, pagination: response.pagination } : 
      { message: response.message });
  }
}

module.exports = ProductsController;