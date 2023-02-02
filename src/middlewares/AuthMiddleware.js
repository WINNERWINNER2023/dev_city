'use strict';

const AuthMiddleware = (req, res, next) => {
  console.log('middleware 지나는중');
  next();
};

module.exports = AuthMiddleware;
