'use strict';

const SampleMiddleware = (req, res, next) => {
  console.log('middleware 지나는중');
  next();
};

module.exports = SampleMiddleware;
