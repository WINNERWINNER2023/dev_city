const ProductsController = require('../../../src/controllers/ProductsController');

const mockProductsService = {
  getRandomProducts: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const productsController = new ProductsController();
productsController.productsService = mockProductsService;
describe('products.controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('product.controller get random product susccess'),
    async () => {
      const getRandomProductsResult = 'test';
      mockProductsService.getRandomProducts = jest.fn(() => {
        return getRandomProductsResult;
      });
      const result = await productsController.getRandomProducts();

      expect(result).toEqual(getRandomProductsResult);
      expect(mockProductsService.getRandomProducts).toHaveBeenCalledTimes(1);
    };
});
