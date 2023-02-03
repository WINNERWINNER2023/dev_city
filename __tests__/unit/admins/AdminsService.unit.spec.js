require('dotenv').config();
const AdminsService = require('../../../src/services/AdminsService');
const { encryptPassword } = require('../../../src/utils/bcryptUtil');
// const { createAccessToken, createRefreshToken } = require('../../../src/utils/TokenUtil');
const redisClient = require('../../../src/utils/RedisUtil');

const mockAdminsRepository = {
  createAdmin: jest.fn(),
  findOneByAccount: jest.fn(),
};
const adminsService = new AdminsService();
adminsService.adminsRepository = mockAdminsRepository;

const mockAdminInfo = {
  id: 1,
  account: 'account',
  password: 'password',
};

describe('AdminsService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createAdmin Method Fail - already registered', async () => {
    const AdminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = 'test';
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.createAdmin(AdminInfo);

    expect(response).toEqual({ code: 401, message: '이미 등록된 관리자' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  test('createAdmin Method Success', async () => {
    const AdminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = null;
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.createAdmin(AdminInfo);

    expect(response).toEqual({ code: 201, message: '관리자 등록 완료' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledWith(AdminInfo);
  });

  test('createAdmin Method fail - DB error (1)', async () => {
    const AdminInfo = { ...mockAdminInfo };

    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.createAdmin(AdminInfo);

    expect(response).toEqual({ code: 500, message: '관리자 등록 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledTimes(0);
  });

  test('createAdmin Method fail - DB error (2)', async () => {
    const AdminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = null;
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    mockAdminsRepository.createAdmin = jest.fn(() => {
      throw new Error('test');
    });

    const response = await adminsService.createAdmin(AdminInfo);

    expect(response).toEqual({ code: 500, message: '관리자 등록 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledWith(AdminInfo);
  });

  test(`login Method fail - admin not found`, async () => {
    const AdminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = null;
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

    expect(response).toEqual({ code: 401, message: '잘못된 관리자 정보' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  test(`login Method fail - Incorrect password`, async () => {
    const AdminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(AdminInfo.password);
    const findOneByAccountResult = { id: 1, password: afterPassword };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.login(AdminInfo.account, AdminInfo.password + 'wrong');

    expect(response).toEqual({ code: 401, message: '잘못된 관리자 정보' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  test(`login Method success`, async () => {
    const AdminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(AdminInfo.password);
    const findOneByAccountResult = { id: 1, password: afterPassword };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    redisClient.set = jest.fn(() => {});
    redisClient.expire = jest.fn(() => {});

    const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

    expect(response).toEqual({ code: 200, accessToken: expect.anything(), refreshToken: expect.anything(), message: '로그인 성공' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  test(`login Method fail - error (1)`, async () => {
    const AdminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(AdminInfo.password);
    const findOneByAccountResult = { id: 1, password: afterPassword };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    redisClient.set = jest.fn(() => {});
    redisClient.expire = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

    expect(response).toEqual({ code: 500, message: '로그인 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  test(`login Method fail - error (2)`, async () => {
    const AdminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(AdminInfo.password);
    const findOneByAccountResult = { id: 1, password: afterPassword };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    redisClient.set = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

    expect(response).toEqual({ code: 500, message: '로그인 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  // test(`login Method fail - error (3)`, async () => {
  //   const AdminInfo = { ...mockAdminInfo };

  //   const afterPassword = await encryptPassword(AdminInfo.password);
  //   const findOneByAccountResult = { id: 1, password: afterPassword };
  //   mockAdminsRepository.findOneByAccount = jest.fn(() => {
  //     return findOneByAccountResult;
  //   });

  //   createAccessToken = jest.fn(() => {
  //     return 'accessToken';
  //   });
  //   createRefreshToken = jest.fn(() => {
  //     throw new Error('hihi');
  //   });

  //   const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

  //   expect(response).toEqual({ code: 500, message: '로그인 실패' });
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  // });

  // test(`login Method fail - error (4)`, async () => {
  //   const AdminInfo = { ...mockAdminInfo };

  //   const afterPassword = await encryptPassword(AdminInfo.password);
  //   const findOneByAccountResult = { id: 1, password: afterPassword };
  //   mockAdminsRepository.findOneByAccount = jest.fn(() => {
  //     return findOneByAccountResult;
  //   });

  //   createAccessToken = jest.fn(() => {
  //     throw new Error();
  //   });

  //   const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

  //   expect(response).toEqual({ code: 500, message: '로그인 실패' });
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  // });

  test(`login Method fail - error (5)`, async () => {
    const AdminInfo = { ...mockAdminInfo };

    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.login(AdminInfo.account, AdminInfo.password);

    expect(response).toEqual({ code: 500, message: '로그인 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });

  test('findOneByAccount Method success', async () => {
    const AdminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = 'test';
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });
    const result = await adminsService.findOneByAccount(AdminInfo.account);

    expect(result).toEqual(findOneByAccountResult);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(AdminInfo.account);
  });
});
