const CustomersRepository = require('../../../src/repositories/CustomersRepository');

const mockCustomer = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

let mockCustomerId = 1;
let mockCustomerEmail = 'Test1@@gmail.com';
let mockCustomerNickname = 'Test1@';

const customerReturnValue = {
  email: 'test',
  nickname: 'Test1@@gmail.com',
  password: 'Test1@',
  phone: '010-1234-5678',
  coin: 0,
};
const customersRepository = new CustomersRepository(mockCustomer);

describe('CustomersRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Customers Repository의 createCustomer Method 성공', async () => {
    customersRepository.model.create = jest.fn(() => customerReturnValue);
    const customer = await customersRepository.createCustomer(mockCustomerId);

    expect(customersRepository.model.create).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerReturnValue);
  });

  test('Customers Repository의 findOneCustomer Method 성공', async () => {
    customersRepository.model.findOne = jest.fn(() => customerReturnValue);
    const customer = await customersRepository.findOneCustomer(mockCustomerId);

    expect(customersRepository.model.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerReturnValue);
  });

  test('Customers Repository의 findCustomerByEmail Method 성공', async () => {
    const customerEmail = { email: 'test' };
    customersRepository.model.findOne = jest.fn(() => customerEmail);
    const customer = await customersRepository.findCustomerByEmail(mockCustomerEmail);

    expect(customersRepository.model.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerEmail);
  });

  test('Customers Repository의 findCustomerByEmail Method 성공', async () => {
    const customerNickname = { nickname: 'Test1@@gmail.com' };
    customersRepository.model.findOne = jest.fn(() => customerNickname);
    const customer = await customersRepository.findCustomerByEmail(mockCustomerNickname);

    expect(customersRepository.model.findOne).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerNickname);
  });

  test('Customers Repository의 changeCustomer Method 성공', async () => {
    customersRepository.model.update = jest.fn(() => customerReturnValue);

    const customer = await customersRepository.changeCustomer(mockCustomerId);

    expect(customersRepository.model.update).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerReturnValue);
  });

  test('Customers Repository의 addCustomerCoin Method 성공', async () => {
    customersRepository.model.increment = jest.fn(() => customerReturnValue);

    const customer = await customersRepository.addCustomerCoin(mockCustomerId);

    expect(customersRepository.model.increment).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerReturnValue);
  });

  test('Customers Repository의 deleteCustomer Method 성공', async () => {
    customersRepository.model.destroy = jest.fn(() => customerReturnValue);

    const customer = await customersRepository.deleteCustomer(mockCustomerId);

    expect(customersRepository.model.destroy).toHaveBeenCalledTimes(1);
    expect(customer).toEqual(customerReturnValue);
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
