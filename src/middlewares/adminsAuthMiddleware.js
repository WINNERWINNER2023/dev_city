'use strict';

const CustomError = require('../errors/CustomError');

const adminsAuthMiddleware = (req, res, next) => {
  console.log('adminsAuthMiddleware 지나는중');

  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    throw new CustomError(401, '로그인 필요');
  }


  next();
};

module.exports = adminsAuthMiddleware;
