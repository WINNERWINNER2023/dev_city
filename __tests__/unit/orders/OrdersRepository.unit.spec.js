const OrdersRepository = require('../../../src/repositories/OrdersRepository');

const mockOrder = {
  count: jest.fn(),
};
const mockSequelize = {
  query: jest.fn(),
}
const mockQueryType = {
  SELECT: jest.fn(),
}

const ordersRepository = new OrdersRepository(mockOrder);
ordersRepository.sequelize = mockSequelize;
ordersRepository.QueryTypes = mockQueryType;

describe('OrdersRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('adminGetOrders Method Success', async () => {
    mockQueryType.SELECT = 'SELECT';
    mockSequelize.query = jest.fn(() => {
      return 'test';
    })
    const page = 1;
    const result = await ordersRepository.adminGetOrders(page);

    expect(result).toEqual('test');
    expect(mockSequelize.query).toHaveBeenCalledTimes(1);
    expect(mockSequelize.query).toHaveBeenCalledWith(expect.anything(), {
      type: mockQueryType.SELECT, 
      replacements: [(page - 1) * ordersRepository.pageLimit, ordersRepository.pageLimit],
    });
  });

  test('adminGetOrdersCountAll Method Success', async () => {
    mockOrder.count = jest.fn(() => {
      return 'test';
    })
    const result = await ordersRepository.adminGetOrdersCountAll();

    expect(result).toEqual('test');
    expect(mockOrder.count).toHaveBeenCalledTimes(1);
    expect(mockOrder.count).toHaveBeenCalledWith({
      raw: true,
    });
  });

  test('adminGetSubOrders Method Success', async () => {
    mockQueryType.SELECT = 'SELECT';
    mockSequelize.query = jest.fn(() => {
      return 'test';
    })
    const page = 1;
    const result = await ordersRepository.adminGetSubOrders(page);

    expect(result).toEqual('test');
    expect(mockSequelize.query).toHaveBeenCalledTimes(1);
    expect(mockSequelize.query).toHaveBeenCalledWith(expect.anything(), {
      type: mockQueryType.SELECT, 
      replacements: [(page - 1) * ordersRepository.pageLimit, ordersRepository.pageLimit],
    });
  });

  test('adminGetSubOrdersCountAll Method Success', async () => {
    mockQueryType.SELECT = 'SELECT';
    mockSequelize.query = jest.fn(() => {
      return 'test';
    })
    const result = await ordersRepository.adminGetSubOrdersCountAll();

    expect(result).toEqual('test');
    expect(mockSequelize.query).toHaveBeenCalledTimes(1);
    expect(mockSequelize.query).toHaveBeenCalledWith(expect.anything(), {
      type: mockQueryType.SELECT, 
    });
  });
});