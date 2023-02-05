const { execPath } = require('process');
const ProductsController = require('../../../src/controllers/ProductsController');

let mockProductsService = {
  getRandomProducts: jest.fn(),
  getProductsList: jest.fn(),
  getProductDetails: jest.fn(),
};

let mockRequest = {
  params: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const getProductsResult = [
  {
    id: 3,
    name: '조성훈',
    contents: '조성훈 설명',
    startUse: '2023-02-12T00:00:00.000Z',
    endUse: '2023-02-12T00:00:00.000Z',
    imagePath: '이미지 주소',
    price: 2141,
    count: 1,
    createdAt: '2023-02-01T12:22:21.000Z',
    updatedAt: '2023-02-01T12:22:21.000Z',
  },
  {
    id: 5,
    name: '박민욱',
    contents: '박민욱 설명',
    startUse: '2023-02-12T00:00:00.000Z',
    endUse: '2023-02-12T00:00:00.000Z',
    imagePath: '이미지 주소',
    price: 2141,
    count: 1,
    createdAt: '2023-02-01T12:22:21.000Z',
    updatedAt: '2023-02-01T12:22:21.000Z',
  },
  {
    id: 2,
    name: '이보형',
    contents: '이보형 설명',
    startUse: '2023-02-12T00:00:00.000Z',
    endUse: '2023-02-12T00:00:00.000Z',
    imagePath: '이미지 주소',
    price: 2141,
    count: 1,
    createdAt: '2023-02-01T12:22:21.000Z',
    updatedAt: '2023-02-01T12:22:21.000Z',
  },
];
const getProductResult = [
  {
    id: 2,
    name: '이보형',
    contents: '이보형 설명',
    startUse: '2023-02-12T00:00:00.000Z',
    endUse: '2023-02-12T00:00:00.000Z',
    imagePath: '이미지 주소',
    price: 2141,
    count: 1,
    createdAt: '2023-02-01T12:22:21.000Z',
    updatedAt: '2023-02-01T12:22:21.000Z',
  },
];
let productsController = new ProductsController();

productsController.productsService = mockProductsService;

describe('products.service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('product.service get random product susccess', async () => {
    mockProductsService.getRandomProducts = jest.fn(() => {
      return getProductsResult;
    });

    await productsController.getRandomProducts(mockRequest, mockResponse);

    expect(mockProductsService.getRandomProducts).toHaveBeenCalledTimes(1);
  });
  test('product.service get products list success', async () => {
    mockProductsService.getProductsList = jest.fn(() => {
      return getProductsResult;
    });

    await productsController.getProductsList(mockRequest, mockResponse);

    expect(mockProductsService.getProductsList).toHaveBeenCalledTimes(1);
  });
  test('product.service get product details success', async () => {
    const requestParams = {
      productId: 2,
    };
    mockRequest.params = requestParams;
    mockProductsService.getProductDetails = jest.fn(() => {
      return getProductResult;
    });
    await productsController.getProductDetails(mockRequest, mockResponse);

    expect(mockProductsService.getProductDetails).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(getProductResult);
  });
});
