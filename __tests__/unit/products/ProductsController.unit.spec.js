const ProductsController = require('../../../src/controllers/ProductsController');

const mockProductsService = {
  createProduct: jest.fn(),
  adminGetProducts: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  files: jest.fn(),
  query: jest.fn(),
  get: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const productsController = new ProductsController();
productsController.productsService = mockProductsService;

describe('ProductsController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('createProduct Method Success', async () => {
    const mockRequestBody = {
      name: 'name',
      contents: 'contents',
      startUse: '2023-01-01 00:00:00',
      endUse: '2023-01-01 23:59:59',
      price: 1000,
      count: 1,
    };
    const mockRequestFiles = [
      { filename: 'imagePath' }
    ];
    mockRequest.body = mockRequestBody;
    mockRequest.files = mockRequestFiles;

    const productInfo = {
      name: mockRequestBody.name,
      contents: mockRequestBody.contents,
      startUse: mockRequestBody.startUse,
      endUse: mockRequestBody.endUse,
      imagePath: mockRequestFiles[0].filename,
      price: mockRequestBody.price,
      count: mockRequestBody.count,
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
      p: 1
    };
    mockRequest.query = mockRequestQuery;
    mockRequest.get = jest.fn(() => {
      return 'test';
    })

    const adminGetProductsResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockProductsService.adminGetProducts = jest.fn(() => {
      return adminGetProductsResult;
    });
    await productsController.adminGetProducts(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProducts).toHaveBeenCalledWith(mockRequest.get(), mockRequestQuery.p);

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
    mockRequest.get = jest.fn(() => {
      return 'test';
    })

    const adminGetProductsResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockProductsService.adminGetProducts = jest.fn(() => {
      return adminGetProductsResult;
    });
    await productsController.adminGetProducts(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProducts).toHaveBeenCalledWith(mockRequest.get(), mockRequestQuery.p || 1);

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
      p: 1
    };
    mockRequest.query = mockRequestQuery;
    mockRequest.get = jest.fn(() => {
      return 'test';
    })

    const adminGetProductsResult = { code: 404, message: '해당하는 상품 목록 없음' };
    mockProductsService.adminGetProducts = jest.fn(() => {
      return adminGetProductsResult;
    });
    await productsController.adminGetProducts(mockRequest, mockResponse);

    expect(mockProductsService.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsService.adminGetProducts).toHaveBeenCalledWith(mockRequest.get(), mockRequestQuery.p);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetProductsResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: adminGetProductsResult.message,
    });
  });
})