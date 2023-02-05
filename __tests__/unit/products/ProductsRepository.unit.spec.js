const { json } = require('sequelize');
const ProductsRepository = require('../../../src/repositories/ProductsRepository');

let mockProductsModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

let productsRepository = new ProductsRepository(mockProductsModel);

describe('products.repository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('product.repository get random product susccess', async () => {
    mockProductsModel.findAll = jest.fn(() => {
      return 'findAll Result';
    });

    const randomProducts = await productsRepository.getRandomProducts();

    expect(mockProductsModel.findAll).toHaveBeenCalledTimes(1);
    expect(randomProducts).toEqual('findAll Result');
  });
  test('product.repostory get products success', async () => {
    mockProductsModel.findAll = jest.fn(() => {
      return 'findAll Result';
    });

    const productsList = await productsRepository.getProductsList();
    expect(mockProductsModel.findAll).toHaveBeenCalledTimes(1);
    expect(productsList).toEqual('findAll Result');
  });
  test('product.repostory get product success', async () => {
    mockProductsModel.findOne = jest.fn(() => {
      return 'findOne Result';
    });

    const product = await productsRepository.getProduct();
    expect(mockProductsModel.findOne).toHaveBeenCalledTimes(1);
    expect(product).toEqual('findOne Result');
  });
});
