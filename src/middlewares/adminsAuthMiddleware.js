'use strict';

const { asyncWrapper } = require('./asyncWrapper');
const CustomError = require('../errors/CustomError');
const { validateAccessToken, validateRefreshToken, createAccessToken } = require('../utils/TokenUtil');
const RedisUtil = require('../utils/RedisUtil');

const adminsAuthMiddleware = asyncWrapper(async (req, res, next) => {
  console.log('path: ', req.path);

  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken || !refreshToken) {
    throw new CustomError(401, '로그인 필요');
  }
  const isAccessTokenValidate = await validateAccessToken(accessToken);
  const isRefreshTokenValidate = await validateRefreshToken(refreshToken);

  if (!isRefreshTokenValidate) {
    throw new CustomError(401, '로그인 필요(refresh token 만료)');
  }
  if (!isAccessTokenValidate) {
    const redisUtil = new RedisUtil();
    const adminId = await redisUtil.get(refreshToken);
    if (!adminId) {
      throw new CustomError(500, '저장된 refresh token을 찾을 수 없음');
    }
    const newAccessToken = await createAccessToken(adminId);
    return res.status(307).json({ accessToken: newAccessToken });
  }
  next();
});

module.exports = adminsAuthMiddleware;
