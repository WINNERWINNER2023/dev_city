require('dotenv').config();
const CustomersService = require('../../../src/services/CustomersService');
const PaginationUtil = require('../../../src/utils/PaginationUtil');

const mockCustomersRepository = {
  createCustomer: jest.fn(),
  findOneCustomer: jest.fn(),
  findCustomerByEmail: jest.fn(),
  findCustomerByNickname: jest.fn(),
  changeCustomer: jest.fn(),
  adminGetCustomers: jest.fn(),
  adminGetCustomersCountAll: jest.fn(),
};

const customersService = new CustomersService();
customersService.customersRepository = mockCustomersRepository;

const mockCustomerId = 1;
const mockErrorResult = { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
const customerReturnValue = [
  {
    email: 'test100@gmail.com',
    nickname: 'Test100',
    password: 'Test100@',
    phone: '010-1234-5678',
    coin: 0,
  },
];
const customerInfo = { ...customerReturnValue };

describe('CustomersService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test.each([
    {
      email: 'test1gmailcom',
      nickname: 'test1',
      password: 'Test1@',
      phone: '010-1234-5678',
    },
    {
      email: 'test1@gmail.com',
      nickname: 'test1',
      password: 'Test1',
      phone: '010-1234-5678',
    },
    {
      email: 'test1@gmail.com',
      nickname: 'test1',
      password: 'Test1@',
      phone: '0101234-5678',
    },
    {
      email: 'test1@gmail.com',
      nickname: '',
      password: 'Test1@',
      phone: '010-1234-5678',
    },
  ])('createCustomer Method Fail', async ({ customerReturnValue }) => {
    const result = await customersService.createCustomer(customerReturnValue);
    expect(result.code).toEqual(401);
  });

  test.each([
    {
      email: null,
      password: null,
    },
    {
      email: null,
      password: 'Test1@',
    },
    {
      email: 'test1@gmail.com',
      password: null,
    },
  ])('loginCustomer Method Fail - login NULL value', async ({ customerReturnValue }) => {
    const result = await customersService.loginCustomer(customerReturnValue);
    expect(result.code).toEqual(401);
  });

  test('findOneCustomer Method Success', async () => {
    mockCustomersRepository.findOneCustomer = jest.fn(() => customerReturnValue);
    const result = await customersService.findOneCustomer(mockCustomerId);

    expect(mockCustomersRepository.findOneCustomer).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerReturnValue);
  });

  test('findOneCustomer Method Fail', async () => {
    mockCustomersRepository.findOneCustomer = jest.fn(() => mockErrorResult);
    const result = await customersService.findOneCustomer(mockCustomerId);

    expect(mockCustomersRepository.findOneCustomer).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockErrorResult);
  });

  test('findCustomerByEmail Method Success', async () => {
    mockCustomersRepository.findOneCustomer = jest.fn(() => customerReturnValue);
    await customersService.findCustomerByEmail(customerInfo.email);

    expect(mockCustomersRepository.findCustomerByEmail).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.findCustomerByEmail).toHaveBeenCalledWith(customerInfo.email);
  });

  test('findCustomerByEmail Method Fail', async () => {
    mockCustomersRepository.findCustomerByEmail = jest.fn(() => mockErrorResult);
    const result = await customersService.findCustomerByEmail(customerInfo.email);

    expect(mockCustomersRepository.findCustomerByEmail).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockErrorResult);
  });

  test('findCustomerByNickname Method Success', async () => {
    mockCustomersRepository.findOneCustomer = jest.fn(() => customerReturnValue);
    await customersService.findCustomerByNickname(customerInfo.email);

    expect(mockCustomersRepository.findCustomerByNickname).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.findCustomerByNickname).toHaveBeenCalledWith(customerInfo.email);
  });

  test('findCustomerByNickname Method Fail', async () => {
    mockCustomersRepository.findCustomerByNickname = jest.fn(() => mockErrorResult);
    const result = await customersService.findCustomerByNickname(customerInfo.email);

    expect(mockCustomersRepository.findCustomerByNickname).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockErrorResult);
  });

  test.each([
    {
      email: 'test1gmailcom',
      nickname: 'test1',
      password: 'Test1@',
      phone: '010-1234-5678',
    },
    {
      email: 'test1@gmail.com',
      nickname: 'test1',
      password: 'Test1',
      phone: '010-1234-5678',
    },
    {
      email: 'test1@gmail.com',
      nickname: 'test1',
      password: 'Test1@',
      phone: '0101234-5678',
    },
    {
      email: 'test1@gmail.com',
      nickname: null,
      password: 'Test1@',
      phone: '010-1234-5678',
    },
  ])('changeCustomer Method Fail', async ({ customerReturnValue }) => {
    const result = await customersService.changeCustomer(customerReturnValue);
    expect(result.code).toEqual(401);
  });

  test('addCustomerCoin Method Success', async () => {
    mockCustomersRepository.addCustomerCoin = jest.fn(() => {
      return 'mock';
    });
    const result = await customersService.addCustomerCoin(mockCustomerId);

    expect(mockCustomersRepository.addCustomerCoin).toHaveBeenCalledTimes(1);
    expect(result.code).toEqual(201);
    expect(result.message).toEqual('코인 충전을 완료했습니다.');
  });

  test('addCustomerCoin Method Fail', async () => {
    mockCustomersRepository.addCustomerCoin = jest.fn(() => {
      throw new Error();
    });
    const result = await customersService.addCustomerCoin(mockCustomerId);

    expect(mockCustomersRepository.addCustomerCoin).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockErrorResult);
  });

  test('deleteCustomer Method Success', async () => {
    mockCustomersRepository.deleteCustomer = jest.fn(() => {
      return 'mock';
    });
    const result = await customersService.deleteCustomer(mockCustomerId);

    expect(mockCustomersRepository.deleteCustomer).toHaveBeenCalledTimes(1);
    expect(result.code).toEqual(201);
    expect(result.message).toEqual('회원 탈퇴가 완료되었습니다.');
  });

  test('deleteCustomer Method Fail', async () => {
    mockCustomersRepository.deleteCustomer = jest.fn(() => {
      throw new Error();
    });
    const result = await customersService.deleteCustomer(mockCustomerId);

    expect(mockCustomersRepository.deleteCustomer).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockErrorResult);
  });

  test('adminGetCustomers Method Fail - get nothing', async () => {
    mockCustomersRepository.adminGetCustomers = jest.fn(() => {
      return [];
    });
    const page = 1;
    const response = await customersService.adminGetCustomers(page);

    expect(response).toEqual({ code: 404, message: '해당하는 유저 목록 없음' });
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledWith(page);
  });

  test('adminGetCustomers Method Fail - adminGetCustomers Error', async () => {
    mockCustomersRepository.adminGetCustomers = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await customersService.adminGetCustomers(page);

    expect(response).toEqual({ code: 500, message: '유저 목록 조회 실패' });
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledWith(page);
  });

  test('adminGetCustomers Method Fail - adminGetCustomersCountAll Error', async () => {
    mockCustomersRepository.adminGetCustomers = jest.fn(() => {
      return [{}, {}];
    });
    mockCustomersRepository.adminGetCustomersCountAll = jest.fn(() => {
      throw new Error();
    });
    const page = 1;
    const response = await customersService.adminGetCustomers(page);

    expect(response).toEqual({ code: 500, message: '유저 목록 조회 실패' });
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledWith(page);
    expect(mockCustomersRepository.adminGetCustomersCountAll).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.adminGetCustomersCountAll).toHaveBeenCalledWith();
  });

  test('adminGetCustomers Method Success', async () => {
    mockCustomersRepository.adminGetCustomers = jest.fn(() => {
      return [{}, {}];
    });
    const adminGetCustomersCountAllResult = { countAll: 2 };
    mockCustomersRepository.adminGetCustomersCountAll = jest.fn(() => {
      return adminGetCustomersCountAllResult;
    });
    const page = 1;
    const response = await customersService.adminGetCustomers(page);
    const paginationUtil = new PaginationUtil(
      page,
      adminGetCustomersCountAllResult.countAll,
      customersService.pageLimit,
      customersService.sectionLimit
    );

    expect(response).toEqual({ code: 200, data: expect.anything(), pagination: paginationUtil.render() });
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.adminGetCustomers).toHaveBeenCalledWith(page);
    expect(mockCustomersRepository.adminGetCustomersCountAll).toHaveBeenCalledTimes(1);
    expect(mockCustomersRepository.adminGetCustomersCountAll).toHaveBeenCalledWith();
  });
});
