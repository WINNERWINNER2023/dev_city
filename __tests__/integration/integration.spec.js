const supertest = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/sequelize/models/index');
// const RedisUtil = require('../../src/utils/RedisUtil');

// const mockRedisClient = {
//   on: jest.fn(),
//   connect: jest.fn(),
//   set: jest.fn(),
//   expire: jest.fn(),
//   disconnect: jest.fn(),
//   get: jest.fn(),
// };

beforeAll(async () => {
  // 통합 테스트(Integration Test)를 진행하기에 앞서
  // Sequelize에 연결된 모든 테이블의 데이터를 삭제
  // 단, NODE_ENV가 test 환경으로 설정되어 있는 경우에만 데이터 삭제
  if (process.env.NODE_ENV === 'test') await sequelize.sync();
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');

  // const redisUtil = new RedisUtil();
  // redisUtil.redisClient = mockRedisClient;
  // mockRedisClient.connect = jest.fn(() => {});
  // mockRedisClient.set = jest.fn(() => {});
  // mockRedisClient.expire = jest.fn(() => {});
  // mockRedisClient.disconnect = jest.fn(() => {});
});

describe('Admins Domain Integration Test', () => {
  test('POST /api/admins/register API Integration Test Success', async () => {
    const requestBody = {
      account: 'account',
      password: 'password',
    };

    const response = await supertest(app).post('/api/admins/register').send(requestBody);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      message: '관리자 등록 완료',
      simpleAdminInfo: expect.anything(),
      accessToken: expect.anything(),
      refreshToken: expect.anything(),
    });
  });

});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화(force: true)
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});