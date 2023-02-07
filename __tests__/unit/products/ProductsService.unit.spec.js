const ProductsService = require('../../../src/services/ProductsService');
const PaginationUtil = require('../../../src/utils/PaginationUtil');

const mockProductsRepository = {
  getRandomProducts: jest.fn(),
  getProductsList: jest.fn(),
  getProduct: jest.fn(),
  createProduct: jest.fn(),
  adminGetProducts: jest.fn(),
  adminGetProductsCountAll: jest.fn(),
  adminGetProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
};
const productsService = new ProductsService();
productsService.productsRepository = mockProductsRepository;

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

  test('product.service get random product susccess', async () => {
    mockProductsRepository.getRandomProducts = jest.fn(() => {
      return 'get random products';
    });
    const randomProducts = await productsService.getRandomProducts();

    expect(mockProductsRepository.getRandomProducts).toHaveBeenCalledTimes(1);
    expect(randomProducts).toEqual('get random products');
  });

  test('product.service get products list success', async () => {
    const page = 1;
    mockProductsRepository.getProductsList = jest.fn(() => {
      return 'get products list';
    });
    const productsList = await productsService.getProductsList(page);

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

  test('createProduct Method Success', async () => {
    const productInfo = { ...mockProductInfo };
    mockProductsRepository.createProduct = jest.fn(() => {
      return 'test';
    });
    const response = await productsService.createProduct(productInfo);

    expect(response).toEqual({ code: 201, message: '상품 등록 완료' });
    expect(mockProductsRepository.createProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.createProduct).toHaveBeenCalledWith(productInfo);
  });

  test('createProduct Method Error', async () => {
    const productInfo = { ...mockProductInfo };
    mockProductsRepository.createProduct = jest.fn(() => {
      throw new Error();
    });
    const response = await productsService.createProduct(productInfo);

    expect(response).toEqual({ code: 500, message: '상품 등록 실패' });
    expect(mockProductsRepository.createProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.createProduct).toHaveBeenCalledWith(productInfo);
  });

  test('adminGetProducts Method Fail - get nothing', async () => {
    mockProductsRepository.adminGetProducts = jest.fn(() => {
      return [];
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);

    expect(response).toEqual({ code: 404, message: '해당하는 상품 목록 없음' });
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledWith(page);
  });

  test('adminGetProducts Method Fail - adminGetProducts Error', async () => {
    mockProductsRepository.adminGetProducts = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);

    expect(response).toEqual({ code: 500, message: '상품 목록 조회 실패' });
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledWith(page);
  });

  test('adminGetProducts Method Fail - adminGetProductsCountAll Error', async () => {
    mockProductsRepository.adminGetProducts = jest.fn(() => {
      return [{ imagePath: '1' }, { imagePath: '2' }];
    });
    mockProductsRepository.adminGetProductsCountAll = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);

    expect(response).toEqual({ code: 500, message: '상품 목록 조회 실패' });
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledWith(page);
    expect(mockProductsRepository.adminGetProductsCountAll).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProductsCountAll).toHaveBeenCalledWith();
  });

  test('adminGetProducts Method Success', async () => {
    mockProductsRepository.adminGetProducts = jest.fn(() => {
      return [{ imagePath: '1' }, { imagePath: '2' }];
    });
    const adminGetProductsCountAllResult = { countAll: 2 };
    mockProductsRepository.adminGetProductsCountAll = jest.fn(() => {
      return adminGetProductsCountAllResult;
    });
    const page = 1;
    const response = await productsService.adminGetProducts('host', page);
    const paginationUtil = new PaginationUtil(
      page,
      adminGetProductsCountAllResult.countAll,
      productsService.pageLimit,
      productsService.sectionLimit
    );

    expect(response).toEqual({ code: 200, data: expect.anything(), pagination: paginationUtil.render() });
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProducts).toHaveBeenCalledWith(page);
    expect(mockProductsRepository.adminGetProductsCountAll).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProductsCountAll).toHaveBeenCalledWith();
  });

  test('adminGetProduct Method Fail - get nothing', async () => {
    mockProductsRepository.adminGetProduct = jest.fn(() => {
      return null;
    });
    const productId = 1;
    const response = await productsService.adminGetProduct('host', productId);

    expect(response).toEqual({ code: 404, message: '해당하는 상품 없음' });
    expect(mockProductsRepository.adminGetProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProduct).toHaveBeenCalledWith(productId);
  });

  test('adminGetProduct Method Fail - adminGetProduct Error', async () => {
    mockProductsRepository.adminGetProduct = jest.fn(() => {
      throw new Error();
    });
    const productId = 1;
    const response = await productsService.adminGetProduct('host', productId);

    expect(response).toEqual({ code: 500, message: '상품 상세 조회 실패' });
    expect(mockProductsRepository.adminGetProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProduct).toHaveBeenCalledWith(productId);
  });

  test('adminGetProduct Method Success', async () => {
    mockProductsRepository.adminGetProduct = jest.fn(() => {
      return { imagePath: '1' };
    });
    const productId = 1;
    const response = await productsService.adminGetProduct('host', productId);

    expect(response).toEqual({ code: 200, data: expect.anything() });
    expect(mockProductsRepository.adminGetProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.adminGetProduct).toHaveBeenCalledWith(productId);
  });

  test('updateProduct Method Success', async () => {
    const productInfo = { ...mockProductInfo };
    mockProductsRepository.updateProduct = jest.fn(() => {
      return 'test';
    });
    const response = await productsService.updateProduct(productInfo);

    expect(response).toEqual({ code: 200, message: '상품 수정 완료' });
    expect(mockProductsRepository.updateProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(productInfo);
  });

  test('updateProduct Method Error', async () => {
    const productInfo = { ...mockProductInfo };
    mockProductsRepository.updateProduct = jest.fn(() => {
      throw new Error();
    });
    const response = await productsService.updateProduct(productInfo);

    expect(response).toEqual({ code: 500, message: '상품 수정 실패' });
    expect(mockProductsRepository.updateProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(productInfo);
  });

  test('deleteProduct Method Success', async () => {
    mockProductsRepository.deleteProduct = jest.fn(() => {
      return 'test';
    });
    const productId = 1;
    const response = await productsService.deleteProduct(productId);

    expect(response).toEqual({ code: 200, message: '상품 삭제 완료' });
    expect(mockProductsRepository.deleteProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.deleteProduct).toHaveBeenCalledWith(productId);
  });

  test('deleteProduct Method Error', async () => {
    mockProductsRepository.deleteProduct = jest.fn(() => {
      throw new Error();
    });
    const productId = 1;
    const response = await productsService.deleteProduct(productId);

    expect(response).toEqual({ code: 500, message: '상품 삭제 실패' });
    expect(mockProductsRepository.deleteProduct).toHaveBeenCalledTimes(1);
    expect(mockProductsRepository.deleteProduct).toHaveBeenCalledWith(productId);
  });
});
