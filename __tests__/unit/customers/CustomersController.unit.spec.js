const CustomersController = require('../../../src/controllers/CustomersController');

const mockCustomersService = {
  adminGetCustomers: jest.fn(),
};

const mockRequest = {
  query: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const customersController = new CustomersController();
customersController.customersService = mockCustomersService;

describe('CustomersController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('adminGetCustomers Method Success', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;

    const adminGetCustomersResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockCustomersService.adminGetCustomers = jest.fn(() => {
      return adminGetCustomersResult;
    });
    await customersController.adminGetCustomers(mockRequest, mockResponse);

    expect(mockCustomersService.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersService.adminGetCustomers).toHaveBeenCalledWith(mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetCustomersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetCustomersResult.data,
      pagination: adminGetCustomersResult.pagination,
    });
  });

  test('adminGetCustomers Method Success - page is not received', async () => {
    const mockRequestQuery = {};
    mockRequest.query = mockRequestQuery;

    const adminGetCustomersResult = { code: 200, data: 'data', pagination: 'pagination' };
    mockCustomersService.adminGetCustomers = jest.fn(() => {
      return adminGetCustomersResult;
    });
    await customersController.adminGetCustomers(mockRequest, mockResponse);

    expect(mockCustomersService.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersService.adminGetCustomers).toHaveBeenCalledWith(mockRequestQuery.p || 1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetCustomersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: adminGetCustomersResult.data,
      pagination: adminGetCustomersResult.pagination,
    });
  });

  test('adminGetCustomers Method Fail - response code not 200', async () => {
    const mockRequestQuery = {
      p: 1,
    };
    mockRequest.query = mockRequestQuery;

    const adminGetCustomersResult = { code: 404, message: '해당하는 유저 목록 없음' };
    mockCustomersService.adminGetCustomers = jest.fn(() => {
      return adminGetCustomersResult;
    });
    await customersController.adminGetCustomers(mockRequest, mockResponse);

    expect(mockCustomersService.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersService.adminGetCustomers).toHaveBeenCalledWith(mockRequestQuery.p);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(adminGetCustomersResult.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: adminGetCustomersResult.message,
    });
  });
});