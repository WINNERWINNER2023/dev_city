const CustomersRepository = require('../../../src/repositories/CustomersRepository');

const mockCustomer = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

const customersRepository = new CustomersRepository(mockCustomer);

describe('CustomersRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('adminGetCustomers Method Success', async () => {
    mockCustomer.findAll = jest.fn(() => {
      return 'test';
    });
    const page = 1;
    const result = await customersRepository.adminGetCustomers(page);

    expect(result).toEqual('test');
    expect(mockCustomer.findAll).toHaveBeenCalledTimes(1);
    expect(mockCustomer.findAll).toHaveBeenCalledWith({
      raw: true,
      attributes: ['id', 'email', 'nickname', 'phone', 'coin', 'createdAt', 'updatedAt'],
      order: [['id', 'DESC']],
      offset: (page - 1) * customersRepository.pageLimit,
      limit: customersRepository.pageLimit,
    });
  });

  test('adminGetCustomersCountAll Method Success', async () => {
    mockCustomer.findOne = jest.fn(() => {
      return 'test';
    });
    const result = await customersRepository.adminGetCustomersCountAll();

    expect(result).toEqual('test');
    expect(mockCustomer.findOne).toHaveBeenCalledTimes(1);
  });
});