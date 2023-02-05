const ProductsRepository = require('../../../src/repositories/ProductsRepository');

const mockProduct = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn(),
};

const productsRepository = new ProductsRepository(mockProduct);

const mockProductInfo = {
  id: 1,
  name: 'name',
  contents: 'contents',
  startUse: '2023-01-01 00:00:00',
  endUse: '2023-01-01 23:59:59',
  imagePath: 'imagePath',
  price: 1000,
  count: 1,
};

describe('ProductsRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('product.repository get random product susccess', async () => {
    mockProduct.findAll = jest.fn(() => {
      return 'findAll Result';
    });

    const randomProducts = await productsRepository.getRandomProducts();

    expect(mockProduct.findAll).toHaveBeenCalledTimes(1);
    expect(randomProducts).toEqual('findAll Result');
  });
  
  test('product.repostory get products success', async () => {
    mockProduct.findAll = jest.fn(() => {
      return 'findAll Result';
    });

    const productsList = await productsRepository.getProductsList();
    expect(mockProduct.findAll).toHaveBeenCalledTimes(1);
    expect(productsList).toEqual('findAll Result');
  });

  test('product.repostory get product success', async () => {
    mockProduct.findOne = jest.fn(() => {
      return 'findOne Result';
    });

    const product = await productsRepository.getProduct();
    expect(mockProduct.findOne).toHaveBeenCalledTimes(1);
    expect(product).toEqual('findOne Result');
  });

  test('createProduct Method Success', async () => {
    const productInfo = { ...mockProductInfo };
    mockProduct.create = jest.fn(() => {
      return 'test';
    });
    await productsRepository.createProduct(productInfo);

    expect(mockProduct.create).toHaveBeenCalledTimes(1);
    expect(mockProduct.create).toHaveBeenCalledWith({
      name: productInfo.name,
      contents: productInfo.contents,
      startUse: productInfo.startUse,
      endUse: productInfo.endUse,
      imagePath: productInfo.imagePath,
      price: productInfo.price,
      count: productInfo.count,
    });
  });

  test('adminGetProducts Method Success', async () => {
    mockProduct.findAll = jest.fn(() => {
      return 'test';
    });
    const page = 1;
    const result = await productsRepository.adminGetProducts(page);

    expect(result).toEqual('test');
    expect(mockProduct.findAll).toHaveBeenCalledTimes(1);
    expect(mockProduct.findAll).toHaveBeenCalledWith({
      raw: true,
      order: [['id', 'DESC']],
      offset: (page - 1) * productsRepository.pageLimit,
      limit: productsRepository.pageLimit,
    });
  });

  test('adminGetProductsCountAll Method Success', async () => {
    mockProduct.findOne = jest.fn(() => {
      return 'test';
    });
    const result = await productsRepository.adminGetProductsCountAll();

    expect(result).toEqual('test');
    expect(mockProduct.findOne).toHaveBeenCalledTimes(1);
  });

  test('adminGetProduct Method Success', async () => {
    mockProduct.findByPk = jest.fn(() => {
      return 'test';
    });
    const productId = 1;
    const result = await productsRepository.adminGetProduct(productId);

    expect(result).toEqual('test');
    expect(mockProduct.findByPk).toHaveBeenCalledTimes(1);
    expect(mockProduct.findByPk).toHaveBeenCalledWith(productId);
  });

  test('updateProduct Method Success - no image', async () => {
    const productInfo = { ...mockProductInfo };
    productInfo.imagePath = null;
    mockProduct.findByPk = jest.fn(() => {
      return {
        async save() {}
      };
    });
    await productsRepository.updateProduct(productInfo);

    expect(mockProduct.findByPk).toHaveBeenCalledTimes(1);
    expect(mockProduct.findByPk).toHaveBeenCalledWith(productInfo.id);
  });

  test('updateProduct Method Success - image exists', async () => {
    const productInfo = { ...mockProductInfo };
    mockProduct.findByPk = jest.fn(() => {
      return {
        async save() {}
      };
    });
    await productsRepository.updateProduct(productInfo);

    expect(mockProduct.findByPk).toHaveBeenCalledTimes(1);
    expect(mockProduct.findByPk).toHaveBeenCalledWith(productInfo.id);
  });

  test('updateProduct Method Fail - no product', async () => {
    const productInfo = { ...mockProductInfo };
    mockProduct.findByPk = jest.fn(() => {
      return null;
    });
    try {
      await productsRepository.updateProduct(productInfo);
    } catch (err) {
      expect(mockProduct.findByPk).toHaveBeenCalledTimes(1);
      expect(mockProduct.findByPk).toHaveBeenCalledWith(productInfo.id);
      expect(err.message).toEqual('해당하는 상품 없음');
    }
  });
});
