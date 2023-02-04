'use strict';

class ProductsRepository {
  constructor(model) {
    this.model = model;
  }

  createProduct = async (productInfo) => {
    await this.model.create({
      name: productInfo.name,
      contents: productInfo.contents,
      startUse: productInfo.startUse,
      endUse: productInfo.endUse,
      imagePath: productInfo.imagePath,
      price: productInfo.price,
      count: productInfo.count,
    });
  };

  getProducts = async () => {
    return await this.model.findAll({
      raw: true,
      order: [['id', 'DESC']],
    });
  }
}

module.exports = ProductsRepository;