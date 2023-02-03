'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT);
  return await bcrypt.hash(password, saltRounds);
};

const checkPassword = async (beforePassword, afterPassword) => {
  return await bcrypt.compare(beforePassword, afterPassword);
};

module.exports = {
  encryptPassword,
  checkPassword,
};
