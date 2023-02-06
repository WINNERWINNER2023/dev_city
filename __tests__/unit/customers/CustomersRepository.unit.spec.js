const CustomersRepository = require('../../../src/repositories/CustomersRepository');

const mockCustomer = {
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  increment: jest.fn(),
  destroy: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
};

const customersRepository = new CustomersRepository(mockCustomer);

const mockCustomerId = 1;
const mockCustomerEmail = 'Test1@@gmail.com';
const mockCustomerNickname = 'Test1@';
const customerReturnValue = {
  email: 'test',
  nickname: 'Test1@@gmail.com',
  password: 'Test1@',
  phone: '010-1234-5678',
  coin: 0,
};

describe('CustomersRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createCustomer Method Success', async () => {
    mockCustomer.create = jest.fn(() => customerReturnValue);
    const result = await customersRepository.createCustomer(mockCustomerId);

    expect(mockCustomer.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerReturnValue);
  });

  test('findOneCustomer Method Success', async () => {
    mockCustomer.findOne = jest.fn(() => customerReturnValue);
    const result = await customersRepository.findOneCustomer(mockCustomerId);

    expect(mockCustomer.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerReturnValue);
  });

  test('findCustomerByEmail Method Success', async () => {
    const customerEmail = { email: 'test1@gmail.com' };
    mockCustomer.findOne = jest.fn(() => customerEmail);
    const result = await customersRepository.findCustomerByEmail(mockCustomerEmail);

    expect(mockCustomer.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerEmail);
  });

  test('findCustomerByNickname Method Success', async () => {
    const customerNickname = { nickname: 'Test1' };
    mockCustomer.findOne = jest.fn(() => customerNickname);
    const result = await customersRepository.findCustomerByNickname(mockCustomerNickname);

    expect(mockCustomer.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerNickname);
  });

  test('changeCustomer Method Success', async () => {
    mockCustomer.update = jest.fn(() => customerReturnValue);
    const result = await customersRepository.changeCustomer(mockCustomerId);

    expect(mockCustomer.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerReturnValue);
  });

  test('addCustomerCoin Method Success', async () => {
    mockCustomer.increment = jest.fn(() => customerReturnValue);
    const result = await customersRepository.addCustomerCoin(mockCustomerId);

    expect(mockCustomer.increment).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerReturnValue);
  });

  test('deleteCustomer Method Success', async () => {
    mockCustomer.destroy = jest.fn(() => customerReturnValue);
    const result = await customersRepository.deleteCustomer(mockCustomerId);

    expect(mockCustomer.destroy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(customerReturnValue);
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
