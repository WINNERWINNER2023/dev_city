const AdminsService = require('../../../src/services/AdminsService');
const { encryptPassword } = require('../../../src/utils/bcryptUtil');
// const { createAccessToken, createRefreshToken } = require('../../../src/utils/TokenUtil');

const mockAdminsRepository = {
  createAdmin: jest.fn(),
  findOneByAccount: jest.fn(),
};
const mockRedisUtil = {
  set: jest.fn(),
  get: jest.fn(),
}
const adminsService = new AdminsService();
adminsService.adminsRepository = mockAdminsRepository;
adminsService.redisUtil = mockRedisUtil;

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
    const adminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = 'test';
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.createAdmin(adminInfo);

    expect(response).toEqual({ code: 401, message: '이미 등록된 관리자' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });

  test('createAdmin Method Success', async () => {
    const adminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = null;
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.createAdmin(adminInfo);

    expect(response).toEqual({ code: 201, message: '관리자 등록 완료' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledWith(adminInfo);
  });

  test('createAdmin Method fail - DB error (1)', async () => {
    const adminInfo = { ...mockAdminInfo };

    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.createAdmin(adminInfo);

    expect(response).toEqual({ code: 500, message: '관리자 등록 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledTimes(0);
  });

  test('createAdmin Method fail - DB error (2)', async () => {
    const adminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = null;
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    mockAdminsRepository.createAdmin = jest.fn(() => {
      throw new Error('test');
    });

    const response = await adminsService.createAdmin(adminInfo);

    expect(response).toEqual({ code: 500, message: '관리자 등록 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.createAdmin).toHaveBeenCalledWith(adminInfo);
  });

  test(`login Method fail - admin not found`, async () => {
    const adminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = null;
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.login(adminInfo.account, adminInfo.password);

    expect(response).toEqual({ code: 401, message: '잘못된 관리자 정보' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });

  test(`login Method fail - Incorrect password`, async () => {
    const adminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(adminInfo.password);
    const findOneByAccountResult = { id: 1, password: afterPassword };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    const response = await adminsService.login(adminInfo.account, adminInfo.password + 'wrong');

    expect(response).toEqual({ code: 401, message: '잘못된 관리자 정보' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });

  test(`login Method Success`, async () => {
    const adminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(adminInfo.password);
    const findOneByAccountResult = { 
      id: 1, 
      account: 'account', 
      password: afterPassword 
    };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    mockRedisUtil.set = jest.fn(() => {});

    const response = await adminsService.login(adminInfo.account, adminInfo.password);

    expect(response).toEqual({ 
      code: 200, 
      simpleAdminInfo: {
        id: findOneByAccountResult.id,
        account: findOneByAccountResult.account,
      }, 
      accessToken: expect.anything(), 
      refreshToken: expect.anything(), 
      message: '로그인 성공' 
    });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });

  test(`login Method fail - redisUtil.set() Error`, async () => {
    const adminInfo = { ...mockAdminInfo };

    const afterPassword = await encryptPassword(adminInfo.password);
    const findOneByAccountResult = { id: 1, password: afterPassword };
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });

    mockRedisUtil.set = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.login(adminInfo.account, adminInfo.password);

    expect(response).toEqual({ code: 500, message: '로그인 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });

  // test(`login Method fail - createRefreshToken Error`, async () => {
  //   const adminInfo = { ...mockAdminInfo };

  //   const afterPassword = await encryptPassword(adminInfo.password);
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

  //   const response = await adminsService.login(adminInfo.account, adminInfo.password);

  //   expect(response).toEqual({ code: 500, message: '로그인 실패' });
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  // });

  // test(`login Method fail - createAccessToken Error`, async () => {
  //   const adminInfo = { ...mockAdminInfo };

  //   const afterPassword = await encryptPassword(adminInfo.password);
  //   const findOneByAccountResult = { id: 1, password: afterPassword };
  //   mockAdminsRepository.findOneByAccount = jest.fn(() => {
  //     return findOneByAccountResult;
  //   });

  //   createAccessToken = jest.fn(() => {
  //     throw new Error();
  //   });

  //   const response = await adminsService.login(adminInfo.account, adminInfo.password);

  //   expect(response).toEqual({ code: 500, message: '로그인 실패' });
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
  //   expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  // });

  test(`login Method fail - findOneByAccount Error`, async () => {
    const adminInfo = { ...mockAdminInfo };

    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      throw new Error();
    });

    const response = await adminsService.login(adminInfo.account, adminInfo.password);

    expect(response).toEqual({ code: 500, message: '로그인 실패' });
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });

  test('findOneByAccount Method Success', async () => {
    const adminInfo = { ...mockAdminInfo };

    const findOneByAccountResult = 'test';
    mockAdminsRepository.findOneByAccount = jest.fn(() => {
      return findOneByAccountResult;
    });
    const result = await adminsService.findOneByAccount(adminInfo.account);

    expect(result).toEqual(findOneByAccountResult);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepository.findOneByAccount).toHaveBeenCalledWith(adminInfo.account);
  });
});
