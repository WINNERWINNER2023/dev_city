const CustomersController = require('../../../src/controllers/CustomersController');

const mockCustomersService = {
  registerCustomer: jest.fn(),
  findOneCustomer: jest.fn(),
  changeCustomer: jest.fn(),
  addCustomerCoin: jest.fn(),
  deleteCustomer: jest.fn(),
  loginCustomer: jest.fn(),
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

const mockCustomerId = 1;
const mockErrorResult = { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
const customerReturnValue = [
  {
    email: 'test100@gmail.com',
    nickname: 'Test100',
    password: 'Test100@',
    phone: '010-1234-5678',
  },
];

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
