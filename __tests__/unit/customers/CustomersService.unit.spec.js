const CustomersService = require('../../../src/services/CustomersService');
const PaginationUtil = require('../../../src/utils/PaginationUtil');

const mockCustomersRepository = {
  adminGetCustomers: jest.fn(),
  adminGetCustomersCountAll: jest.fn(),
};
const customersService = new CustomersService();
customersService.customersRepository = mockCustomersRepository;

describe('CustomersService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
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