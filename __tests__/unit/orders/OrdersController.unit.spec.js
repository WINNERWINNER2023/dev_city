const OrdersController = require('../../../src/controllers/OrdersController');

const mockOrdersService = {
  adminGetOrders: jest.fn(),
};

const mockRequest = {
  query: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const ordersController = new OrdersController();
ordersController.ordersService = mockOrdersService;

describe('OrdersController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('adminGetOrders Method Success', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;

    const adminGetOrdersResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockOrdersService.adminGetOrders = jest.fn(() => {
      return adminGetOrdersResult;
    });
    await ordersController.adminGetOrders(mockRequest, mockResponse);

    expect(mockOrdersService.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersService.adminGetOrders).toHaveBeenCalledWith(mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetOrdersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetOrdersResult.data,
      pagination: adminGetOrdersResult.pagination,
    });
  });

  test('adminGetOrders Method Success - page is not received', async () => {
    const mockRequestQuery = {};
    mockRequest.query = mockRequestQuery;

    const adminGetOrdersResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockOrdersService.adminGetOrders = jest.fn(() => {
      return adminGetOrdersResult;
    });
    await ordersController.adminGetOrders(mockRequest, mockResponse);

    expect(mockOrdersService.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersService.adminGetOrders).toHaveBeenCalledWith(mockRequestQuery.p || 1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetOrdersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetOrdersResult.data,
      pagination: adminGetOrdersResult.pagination,
    });
  });

  test('adminGetOrders Method Fail - response code not 200', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;

    const adminGetOrdersResult = { code: 404, message: '해당하는 주문 목록 없음' };
    mockOrdersService.adminGetOrders = jest.fn(() => {
      return adminGetOrdersResult;
    });
    await ordersController.adminGetOrders(mockRequest, mockResponse);

    expect(mockOrdersService.adminGetOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersService.adminGetOrders).toHaveBeenCalledWith(mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetOrdersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: adminGetOrdersResult.message,
    });
  });

  test('adminGetSubOrders Method Success', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;

    const adminGetSubOrdersResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockOrdersService.adminGetSubOrders = jest.fn(() => {
      return adminGetSubOrdersResult;
    });
    await ordersController.adminGetSubOrders(mockRequest, mockResponse);

    expect(mockOrdersService.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersService.adminGetSubOrders).toHaveBeenCalledWith(mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetSubOrdersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetSubOrdersResult.data,
      pagination: adminGetSubOrdersResult.pagination,
    });
  });

  test('adminGetSubOrders Method Success - page is not received', async () => {
    const mockRequestQuery = {};
    mockRequest.query = mockRequestQuery;

    const adminGetSubOrdersResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockOrdersService.adminGetSubOrders = jest.fn(() => {
      return adminGetSubOrdersResult;
    });
    await ordersController.adminGetSubOrders(mockRequest, mockResponse);

    expect(mockOrdersService.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersService.adminGetSubOrders).toHaveBeenCalledWith(mockRequestQuery.p || 1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetSubOrdersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetSubOrdersResult.data,
      pagination: adminGetSubOrdersResult.pagination,
    });
  });

  test('adminGetSubOrders Method Fail - response code not 200', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;

    const adminGetSubOrdersResult = { code: 404, message: '해당하는 주문 목록 없음' };
    mockOrdersService.adminGetSubOrders = jest.fn(() => {
      return adminGetSubOrdersResult;
    });
    await ordersController.adminGetSubOrders(mockRequest, mockResponse);

    expect(mockOrdersService.adminGetSubOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersService.adminGetSubOrders).toHaveBeenCalledWith(mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetSubOrdersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: adminGetSubOrdersResult.message,
    });
  });
});