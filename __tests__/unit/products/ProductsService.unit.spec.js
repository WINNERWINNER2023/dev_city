const ProductsService = require('../../../src/services/ProductsService');

let mockProductsRepository = {
  getRandomProducts: jest.fn(),
  getProductsList: jest.fn(),
  getProduct: jest.fn(),
};

let productsService = new ProductsService();

productsService.productsTable = mockProductsRepository;

describe('products.service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('product.service get random product susccess', async () => {
    mockProductsRepository.getRandomProducts = jest.fn(() => {
      return 'get random products';
    });
    const randomProducts = await productsService.getRandomProducts();

    expect(mockProductsRepository.getRandomProducts).toHaveBeenCalledTimes(1);
    expect(randomProducts).toEqual('get random products');
  });
  test('product.service get products list success', async () => {
    mockProductsRepository.getProductsList = jest.fn(() => {
      return 'get products list';
    });
    const productsList = await productsService.getProductsList();

    expect(mockProductsRepository.getProductsList).toHaveBeenCalledTimes(1);
    expect(productsList).toEqual('get products list');
  });
  test('product.service get product details success', async () => {
    mockProductsRepository.getProduct = jest.fn(() => {
      return 'get product details';
    });
    const product = await productsService.getProductDetails();

    expect(mockProductsRepository.getProduct).toHaveBeenCalledTimes(1);
    expect(product).toEqual('get product details');
  });
});
