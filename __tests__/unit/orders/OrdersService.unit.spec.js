const OrdersService = require('../../../src/services/OrdersService');
const PaginationUtil = require('../../../src/utils/PaginationUtil');

const mockOrdersRepository = {
  adminGetOrders: jest.fn(),
  adminGetOrdersCountAll: jest.fn(),
  adminGetSubOrders: jest.fn(),
  adminGetSubOrdersCountAll: jest.fn(),
};
const ordersService = new OrdersService();
ordersService.ordersRepository = mockOrdersRepository;

describe('OrdersService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('adminGetOrders Method Fail - get nothing', async () => {
    mockOrdersRepository.adminGetOrders = jest.fn(() => {
      return [];
    });
    const page = 1;
    const response = await ordersService.adminGetOrders(page);

    expect(response).toEqual({ code: 404, message: '해당하는 주문 목록 없음' });
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledWith(page);
  });

  test('adminGetOrders Method Fail - adminGetOrders Error', async () => {
    mockOrdersRepository.adminGetOrders = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await ordersService.adminGetOrders(page);

    expect(response).toEqual({ code: 500, message: '주문 목록 조회 실패' });
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledWith(page);
  });

  test('adminGetOrders Method Fail - adminGetOrdersCountAll Error', async () => {
    mockOrdersRepository.adminGetOrders = jest.fn(() => {
      return [{}, {}];
    });
    mockOrdersRepository.adminGetOrdersCountAll = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await ordersService.adminGetOrders(page);

    expect(response).toEqual({ code: 500, message: '주문 목록 조회 실패' });
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledWith(page);
    expect(mockOrdersRepository.adminGetOrdersCountAll).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetOrdersCountAll).toHaveBeenCalledWith();
  });

  test('adminGetOrders Method Success', async () => {
    mockOrdersRepository.adminGetOrders = jest.fn(() => {
      return [{}, {}];
    });
    const adminGetOrdersCountAllResult = 2;
    mockOrdersRepository.adminGetOrdersCountAll = jest.fn(() => {
      return adminGetOrdersCountAllResult;
    });
    const page = 1;
    const response = await ordersService.adminGetOrders(page);
    const paginationUtil = new PaginationUtil(
      page,
      adminGetOrdersCountAllResult,
      ordersService.pageLimit,
      ordersService.sectionLimit
    );

    expect(response).toEqual({ code: 200, data: expect.anything(), pagination: paginationUtil.render() });
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetOrders).toHaveBeenCalledWith(page);
    expect(mockOrdersRepository.adminGetOrdersCountAll).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetOrdersCountAll).toHaveBeenCalledWith();
  });

  test('adminGetSubOrders Method Fail - get nothing', async () => {
    mockOrdersRepository.adminGetSubOrders = jest.fn(() => {
      return [];
    });
    const page = 1;
    const response = await ordersService.adminGetSubOrders(page);

    expect(response).toEqual({ code: 404, message: '해당하는 상세주문 목록 없음' });
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledWith(page);
  });

  test('adminGetSubOrders Method Fail - adminGetSubOrders Error', async () => {
    mockOrdersRepository.adminGetSubOrders = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await ordersService.adminGetSubOrders(page);

    expect(response).toEqual({ code: 500, message: '상세주문 목록 조회 실패' });
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledWith(page);
  });

  test('adminGetSubOrders Method Fail - adminGetSubOrdersCountAll Error', async () => {
    mockOrdersRepository.adminGetSubOrders = jest.fn(() => {
      return [{}, {}];
    });
    mockOrdersRepository.adminGetSubOrdersCountAll = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await ordersService.adminGetSubOrders(page);

    expect(response).toEqual({ code: 500, message: '상세주문 목록 조회 실패' });
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledWith(page);
    expect(mockOrdersRepository.adminGetSubOrdersCountAll).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetSubOrdersCountAll).toHaveBeenCalledWith();
  });

  test('adminGetSubOrders Method Success', async () => {
    mockOrdersRepository.adminGetSubOrders = jest.fn(() => {
      return [{}, {}];
    });
    const adminGetSubOrdersCountAllResult = [{ countAll: 2 }];
    mockOrdersRepository.adminGetSubOrdersCountAll = jest.fn(() => {
      return adminGetSubOrdersCountAllResult;
    });
    const page = 1;
    const response = await ordersService.adminGetSubOrders(page);
    const paginationUtil = new PaginationUtil(
      page,
      adminGetSubOrdersCountAllResult[0].countAll,
      ordersService.pageLimit,
      ordersService.sectionLimit
    );

    expect(response).toEqual({ code: 200, data: expect.anything(), pagination: paginationUtil.render() });
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetSubOrders).toHaveBeenCalledWith(page);
    expect(mockOrdersRepository.adminGetSubOrdersCountAll).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.adminGetSubOrdersCountAll).toHaveBeenCalledWith();
  });
});