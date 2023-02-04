const ProductsService = require('../../../src/services/ProductsService');
const PaginationUtil = require('../../../src/utils/PaginationUtil');

const mockProductRepository = {
  createProduct: jest.fn(),
  adminGetProducts: jest.fn(),
  adminGetProductsCountAll: jest.fn(),
};
const productsService = new ProductsService();
productsService.productsRepository = mockProductRepository;

const mockProductInfo = {
  name: 'name',
  contents: 'contents',
  startUse: '2023-01-01 00:00:00',
  endUse: '2023-01-01 23:59:59',
  imagePath: 'imagePath',
  price: 1000,
  count: 1,
};

describe('ProductsService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createProduct Method Success', async () => {
    mockProductRepository.createProduct = jest.fn(() => {
      return 'test';
    });
    const response = await productsService.createProduct(mockProductInfo);

    expect(response).toEqual({ code: 201, message: '상품 등록 완료' });
    expect(mockProductRepository.createProduct).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.createProduct).toHaveBeenCalledWith(mockProductInfo);
  });

  test('createProduct Method Error', async () => {
    mockProductRepository.createProduct = jest.fn(() => {
      throw new Error();
    });
    const response = await productsService.createProduct(mockProductInfo);

    expect(response).toEqual({ code: 500, message: '상품 등록 실패' });
    expect(mockProductRepository.createProduct).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.createProduct).toHaveBeenCalledWith(mockProductInfo);
  });

  test('adminGetProducts Method Fail - get nothing', async () => {
    mockProductRepository.adminGetProducts = jest.fn(() => {
      return [];
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);

    expect(response).toEqual({ code: 404, message: '해당하는 상품 목록 없음' });
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledWith(page);
  });

  test('adminGetProducts Method Fail - adminGetProducts Error', async () => {
    mockProductRepository.adminGetProducts = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);

    expect(response).toEqual({ code: 500, message: '상품 목록 조회 실패' });
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledWith(page);
  });

  test('adminGetProducts Method Fail - adminGetProductsCountAll Error', async () => {
    mockProductRepository.adminGetProducts = jest.fn(() => {
      return [{imagePath: '1'}, {imagePath: '2'}];
    });
    mockProductRepository.adminGetProductsCountAll = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);

    expect(response).toEqual({ code: 500, message: '상품 목록 조회 실패' });
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledWith(page);
    expect(mockProductRepository.adminGetProductsCountAll).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.adminGetProductsCountAll).toHaveBeenCalledWith();
  });

  test('adminGetProducts Method Success', async () => {
    mockProductRepository.adminGetProducts = jest.fn(() => {
      return [{imagePath: '1'}, {imagePath: '2'}];
    });
    const adminGetProductsCountAllResult = { countAll: 2 };
    mockProductRepository.adminGetProductsCountAll = jest.fn(() => {
      return adminGetProductsCountAllResult;
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);
    const paginationUtil = new PaginationUtil(page, adminGetProductsCountAllResult.countAll, productsService.pageLimit, productsService.sectionLimit);

    expect(response).toEqual({ code: 200, data: expect.anything(), pagination: paginationUtil.render() });
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.adminGetProducts).toHaveBeenCalledWith(page);
    expect(mockProductRepository.adminGetProductsCountAll).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.adminGetProductsCountAll).toHaveBeenCalledWith();
  });
});