require('dotenv').config();
const RedisUtil = require('../../../src/utils/RedisUtil');

const mockRedisClient = {
  on: jest.fn(),
  connect: jest.fn(),
  set: jest.fn(),
  expire: jest.fn(),
  disconnect: jest.fn(),
  get: jest.fn(),
};

const redisUtil = new RedisUtil();
redisUtil.redisClient = mockRedisClient;

describe('RedisUtil Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('set Method Success', async () => {
    mockRedisClient.connect = jest.fn(() => {
      return 'connect';
    });
    mockRedisClient.set = jest.fn(() => {
      return 'set';
    });
    mockRedisClient.expire = jest.fn(() => {
      return 'expire';
    });
    mockRedisClient.disconnect = jest.fn(() => {
      return 'disconnect';
    });
    const TTL = parseInt(process.env.REDIS_REFRESH_TTL);
    await redisUtil.set('key', 'value');

    expect(mockRedisClient.connect).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.connect).toHaveBeenCalledWith();
    expect(mockRedisClient.set).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.set).toHaveBeenCalledWith('key', 'value');
    expect(mockRedisClient.expire).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.expire).toHaveBeenCalledWith('key', TTL);
    expect(mockRedisClient.disconnect).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.disconnect).toHaveBeenCalledWith();
  });

  test('get Method Success', async () => {
    mockRedisClient.connect = jest.fn(() => {
      return 'connect';
    });
    mockRedisClient.get = jest.fn(() => {
      return 'get';
    });
    mockRedisClient.disconnect = jest.fn(() => {
      return 'disconnect';
    });
    const result = await redisUtil.get('key');

    expect(result).toEqual('get');
    expect(mockRedisClient.connect).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.connect).toHaveBeenCalledWith();
    expect(mockRedisClient.get).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.get).toHaveBeenCalledWith('key');
    expect(mockRedisClient.disconnect).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.disconnect).toHaveBeenCalledWith();
  });
});
