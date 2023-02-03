'use strict';

require('dotenv').config();
const redis = require('redis');

class RedisUtil {
  constructor() {
    this.redisClient = redis.createClient();

    this.redisClient.on('connect', () => {
      console.log('Redis 연결 성공');
    });
    this.redisClient.on('error', () => {
      console.log('Redis 연결 실패');
    });

    this.redisClient.connect();
  }

  set = async (key, value) => {
    await this.redisClient.set(key, value);
    const TTL = parseInt(process.env.REDIS_REFRESH_TTL);
    await this.redisClient.expire(key, TTL);
    await this.redisClient.disconnect();
  }

  get = async (key) => {
    const value = await this.redisClient.get(key);
    await this.redisClient.disconnect();
    return value;
  }
}

module.exports = RedisUtil;
