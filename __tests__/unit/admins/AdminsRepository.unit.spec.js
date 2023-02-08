const AdminsRepository = require('../../../src/repositories/AdminsRepository');

const mockAdmin = {
  create: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn(),
};

const adminsRepository = new AdminsRepository(mockAdmin);

describe('AdminRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createAdmin Method Success', async () => {
    mockAdmin.create = jest.fn(() => {
      return 'test';
    });

    const adminInfo = {
      account: 'account',
      password: 'password',
    };
    await adminsRepository.createAdmin(adminInfo);

    expect(mockAdmin.create).toHaveBeenCalledTimes(1);
    expect(mockAdmin.create).toHaveBeenCalledWith({
      account: adminInfo.account,
      password: adminInfo.password,
    });
  });

  test('findOneByAccount Method Success', async () => {
    mockAdmin.findOne = jest.fn(() => {
      return 'test';
    });
    const result = await adminsRepository.findOneByAccount('account');

    expect(result).toEqual('test');
    expect(mockAdmin.findOne).toHaveBeenCalledTimes(1);
    expect(mockAdmin.findOne).toHaveBeenCalledWith({ where: { account: 'account' } });
  });
});
