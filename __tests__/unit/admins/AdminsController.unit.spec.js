const AdminsController = require('../../../src/controllers/AdminsController');

const mockAdminsService = {
  createAdmin: jest.fn(),
  login: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const adminsController = new AdminsController();
adminsController.adminsService = mockAdminsService;

describe('AdminsController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('register Method Success', async () => {
    const requestBody = {
      account: 'account',
      password: 'password',
    };
    mockRequest.body = requestBody;

    const adminInfo = {
      account: requestBody.account,
      password: requestBody.password,
    };
    const registerResponse = {
      code: 201,
      message: '관리자 등록 완료',
    };
    mockAdminsService.createAdmin = jest.fn(() => {
      return registerResponse;
    });

    const loginResponse = {
      code: 200,
      simpleAdminInfo: 'simpleAdminInfo',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      message: '로그인 성공',
    };
    mockAdminsService.login = jest.fn(() => {
      return loginResponse;
    });

    await adminsController.register(mockRequest, mockResponse);

    expect(mockAdminsService.createAdmin).toHaveBeenCalledTimes(1);
    expect(mockAdminsService.createAdmin).toHaveBeenCalledWith(adminInfo);
    expect(mockAdminsService.login).toHaveBeenCalledTimes(1);
    expect(mockAdminsService.login).toHaveBeenCalledWith(requestBody.account, requestBody.password);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(registerResponse.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: registerResponse.message,
      simpleAdminInfo: loginResponse.simpleAdminInfo,
      accessToken: loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken,
    });
  });

  test('register Method fail - already registered', async () => {
    const requestBody = {
      account: 'account',
      password: 'password',
    };
    mockRequest.body = requestBody;

    const adminInfo = {
      account: requestBody.account,
      password: requestBody.password,
    };
    const registerResponse = {
      code: 409,
      message: '이미 등록된 관리자',
    };
    mockAdminsService.createAdmin = jest.fn(() => {
      return registerResponse;
    });

    await adminsController.register(mockRequest, mockResponse);

    expect(mockAdminsService.createAdmin).toHaveBeenCalledTimes(1);
    expect(mockAdminsService.createAdmin).toHaveBeenCalledWith(adminInfo);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(registerResponse.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: registerResponse.message,
    });
  });

  test('login Method Success', async () => {
    const requestBody = {
      account: 'account',
      password: 'password',
    };
    mockRequest.body = requestBody;

    const response = {
      code: 200,
      simpleAdminInfo: 'simpleAdminInfo',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      message: '로그인 성공',
    };
    mockAdminsService.login = jest.fn(() => {
      return response;
    });

    await adminsController.login(mockRequest, mockResponse);

    expect(mockAdminsService.login).toHaveBeenCalledTimes(1);
    expect(mockAdminsService.login).toHaveBeenCalledWith(requestBody.account, requestBody.password);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(response.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: response.message,
      simpleAdminInfo: response.simpleAdminInfo,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  });

  test('login Method fail - wrong id, pw', async () => {
    const requestBody = {
      account: 'account',
      password: 'wrong',
    };
    mockRequest.body = requestBody;

    const response = { code: 401, message: '잘못된 관리자 정보' };
    mockAdminsService.login = jest.fn(() => {
      return response;
    });

    await adminsController.login(mockRequest, mockResponse);

    expect(mockAdminsService.login).toHaveBeenCalledTimes(1);
    expect(mockAdminsService.login).toHaveBeenCalledWith(requestBody.account, requestBody.password);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(response.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: response.message,
    });
  });
});
