const ProductsController = require('../../../src/controllers/ProductsController');

const mockProductsService = {
  getRandomProducts: jest.fn(),
  getProductsList: jest.fn(),
  getProductDetails: jest.fn(),
  createProduct: jest.fn(),
  adminGetProducts: jest.fn(),
  adminGetProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  files: jest.fn(),
  query: jest.fn(),
  get: jest.fn(),
  protocol: jest.fn(),
};

const mockResponse = {
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
const productsController = new ProductsController();
productsController.productsService = mockProductsService;

const mockRequestBody = {
  name: 'name',
  contents: 'contents',
  startUse: '2023-01-01 00:00:00',
  endUse: '2023-01-01 23:59:59',
  price: 1000,
  count: 1,
};

describe('ProductsController Unit Test', () => {
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

  test('createProduct Method Success', async () => {
    const requestBody = { ...mockRequestBody };
    const mockRequestFiles = [{ filename: 'imagePath' }];
    mockRequest.body = requestBody;
    mockRequest.files = mockRequestFiles;

    const productInfo = {
      name: requestBody.name,
      contents: requestBody.contents,
      startUse: requestBody.startUse,
      endUse: requestBody.endUse,
      imagePath: mockRequestFiles[0].filename,
      price: requestBody.price,
      count: requestBody.count,
    };
    const createProductResult = { code: 201, message: '상품 등록 완료' };
    mockProductsService.createProduct = jest.fn(() => {
      return createProductResult;
    });

    await productsController.createProduct(mockRequest, mockResponse);

    expect(mockProductsService.createProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsService.createProduct).toHaveBeenCalledWith(productInfo);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(createProductResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: createProductResult.message,
    });
  });

  // test('createProduct Method Fail - imagePath is null', async () => {
  //   const mockRequestBody = {
  //     name: 'name',
  //     contents: 'contents',
  //     startUse: '2023-01-01 00:00:00',
  //     endUse: '2023-01-01 23:59:59',
  //     price: 1000,
  //     count: 1,
  //   };
  //   const mockRequestFiles = [
  //     {}
  //   ];
  //   mockRequest.body = mockRequestBody;
  //   mockRequest.files = mockRequestFiles;

  //   await productsController.createProduct(mockRequest, mockResponse);

  //   expect(mockProductsService.createProduct).toHaveBeenCalledTimes(0);
  //   expect(mockResponse.status).toHaveBeenCalledTimes(1);
  //   expect(mockResponse.status).toHaveBeenCalledWith(400);
  //   expect(mockResponse.json).toHaveBeenCalledTimes(1);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     message: '상품 사진 수신 오류',
  //   });
  // });

  test('adminGetProducts Method Success', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;
    mockRequest.protocol = 'protocol';
    mockRequest.get = jest.fn(() => {
      return 'get';
    });

    const adminGetProductsResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockProductsService.adminGetProducts = jest.fn(() => {
      return adminGetProductsResult;
    });
    await productsController.adminGetProducts(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProducts).toHaveBeenCalledWith(`${mockRequest.protocol}://${mockRequest.get()}`, mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetProductsResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetProductsResult.data,
      pagination: adminGetProductsResult.pagination,
    });
  });

  test('adminGetProducts Method Success - page is not received', async () => {
    const mockRequestQuery = {};
    mockRequest.query = mockRequestQuery;
    mockRequest.protocol = 'protocol';
    mockRequest.get = jest.fn(() => {
      return 'get';
    });

    const adminGetProductsResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockProductsService.adminGetProducts = jest.fn(() => {
      return adminGetProductsResult;
    });
    await productsController.adminGetProducts(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProducts).toHaveBeenCalledWith(`${mockRequest.protocol}://${mockRequest.get()}`, mockRequestQuery.p || 1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetProductsResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetProductsResult.data,
      pagination: adminGetProductsResult.pagination,
    });
  });

  test('adminGetProducts Method Fail - response code not 200', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;
    mockRequest.protocol = 'protocol';
    mockRequest.get = jest.fn(() => {
      return 'get';
    });

    const adminGetProductsResult = { code: 404, message: '해당하는 상품 목록 없음' };
    mockProductsService.adminGetProducts = jest.fn(() => {
      return adminGetProductsResult;
    });
    await productsController.adminGetProducts(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProducts).toHaveBeenCalledWith(`${mockRequest.protocol}://${mockRequest.get()}`, mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetProductsResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: adminGetProductsResult.message,
    });
  });

  test('adminGetProduct Method Success', async () => {
    const mockRequestParams = {
      productId: 1,
    };
    mockRequest.params = mockRequestParams;
    mockRequest.protocol = 'protocol';
    mockRequest.get = jest.fn(() => {
      return 'get';
    });

    const adminGetProductResult = { code: 200, data: 'data' };
    mockProductsService.adminGetProduct = jest.fn(() => {
      return adminGetProductResult;
    });
    await productsController.adminGetProduct(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProduct).toHaveBeenCalledWith(`${mockRequest.protocol}://${mockRequest.get()}`, mockRequestParams.productId);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetProductResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetProductResult.data,
    });
  });

  test('adminGetProduct Method Success - productId is wrong type', async () => {
    const mockRequestParams = {
      productId: 'wrong',
    };
    mockRequest.params = mockRequestParams;
    mockRequest.protocol = 'protocol';
    mockRequest.get = jest.fn(() => {
      return 'get';
    });

    await productsController.adminGetProduct(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProduct).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '잘못된 요청',
    });
  });

  test('adminGetProduct Method Fail - response code not 200', async () => {
    const mockRequestParams = {
      productId: 1,
    };
    mockRequest.params = mockRequestParams;
    mockRequest.protocol = 'protocol';
    mockRequest.get = jest.fn(() => {
      return 'get';
    });

    const adminGetProductResult = { code: 404, message: '해당하는 상품 없음' };
    mockProductsService.adminGetProduct = jest.fn(() => {
      return adminGetProductResult;
    });
    await productsController.adminGetProduct(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProduct).toHaveBeenCalledWith(`${mockRequest.protocol}://${mockRequest.get()}`, mockRequestParams.productId);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetProductResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: adminGetProductResult.message,
    });
  });

  test('updateProduct Method Fail - wrong productId', async () => {
    const mockRequestParams = {
      productId: 'wrong',
    };
    mockRequest.params = mockRequestParams;
    await productsController.updateProduct(mockRequest, mockResponse);

    expect(mockProductsService.updateProduct).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '잘못된 요청',
    });
  });

  test('updateProduct Method Success', async () => {
    const mockRequestParams = {
      productId: 1,
    };
    const requestBody = { ...mockRequestBody };
    const mockRequestFiles = [{ filename: 'imagePath' }];
    mockRequest.params = mockRequestParams;
    mockRequest.body = requestBody;
    mockRequest.files = mockRequestFiles;

    const productInfo = {
      id: mockRequestParams.productId,
      name: requestBody.name,
      contents: requestBody.contents,
      startUse: requestBody.startUse,
      endUse: requestBody.endUse,
      imagePath: mockRequestFiles[0].filename,
      price: requestBody.price,
      count: requestBody.count,
    };
    const updateProductResult = { code: 200, message: '상품 수정 완료' };
    mockProductsService.updateProduct = jest.fn(() => {
      return updateProductResult;
    });

    await productsController.updateProduct(mockRequest, mockResponse);

    expect(mockProductsService.updateProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsService.updateProduct).toHaveBeenCalledWith(productInfo);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(updateProductResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: updateProductResult.message,
    });
  });

  test('deleteProduct Method Fail - wrong productId', async () => {
    const mockRequestParams = {
      productId: 'wrong',
    };
    mockRequest.params = mockRequestParams;
    await productsController.deleteProduct(mockRequest, mockResponse);

    expect(mockProductsService.deleteProduct).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '잘못된 요청',
    });
  });

  test('deleteProduct Method Success', async () => {
    const mockRequestParams = {
      productId: 1,
    };
    mockRequest.params = mockRequestParams;

    const deleteProductResult = { code: 200, message: '상품 삭제 완료' };
    mockProductsService.deleteProduct = jest.fn(() => {
      return deleteProductResult;
    });

    await productsController.deleteProduct(mockRequest, mockResponse);

    expect(mockProductsService.deleteProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsService.deleteProduct).toHaveBeenCalledWith(mockRequestParams.productId);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(deleteProductResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: deleteProductResult.message,
    });
  });
});
