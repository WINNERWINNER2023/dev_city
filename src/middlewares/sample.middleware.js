'use strict';

module.exports = (req, res, next) => {
  console.log('0-2. sample middleware를 지나침');
  next(); // next를 통해 middleware를 지나게 해야한다.
};
