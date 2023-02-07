'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, 'customized-secret-key');
    User.findById(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};

// const AuthMiddleware = (req, res, next) => {
//   console.log('middleware 지나는중');
//   next();
// };

// module.exports = AuthMiddleware;
