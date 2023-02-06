'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createAccessToken = async (id) => {
  const expiresIn = process.env.JWT_ACCESS_EXPIRES;
  const accessToken = jwt.sign({ id }, SECRET_KEY, { expiresIn });
  return accessToken;
};

const createRefreshToken = async () => {
  const expiresIn = process.env.JWT_REFRESH_EXPIRES;
  const refreshToken = jwt.sign({}, SECRET_KEY, { expiresIn });
  return refreshToken;
};

const validateAccessToken = async (accessToken) => {
  try {
    jwt.verify(accessToken, SECRET_KEY);
    return true;
  } catch {
    return false;
  }
};

const validateRefreshToken = async (refreshToken) => {
  try {
    jwt.verify(refreshToken, SECRET_KEY);
    return true;
  } catch {
    return false;
  }
};

const getAccessTokenPayload = async (accessToken) => {
  try {
    return jwt.verify(accessToken, SECRET_KEY);
  } catch {
    return null;
  }
};

module.exports = {
  createAccessToken, 
  createRefreshToken, 
  validateAccessToken, 
  validateRefreshToken, 
  getAccessTokenPayload
};
