'use strict';

const AdminsRepository = require('../repositories/AdminsRepository');
const { Admin } = require('../sequelize/models');

const { encryptPassword, comparePasswordForLogin } = require('../utils/bcryptUtil');
const { createAccessToken, createRefreshToken } = require('../utils/TokenUtil');
const RedisUtil = require('../utils/RedisUtil');

class AdminsService {
  adminsRepository = new AdminsRepository(Admin);
  redisUtil = new RedisUtil();

  createAdmin = async (adminInfo) => {
    try {
      const admin = await this.findOneByAccount(adminInfo.account);
      if (admin) {
        return { code: 401, message: '이미 등록된 관리자' };
      }
      adminInfo.password = await encryptPassword(adminInfo.password);
      await this.adminsRepository.createAdmin(adminInfo);
      return { code: 201, message: '관리자 등록 완료' };
    } catch (err) {
      return { code: 500, message: '관리자 등록 실패' };
    }
  };

  login = async (account, password) => {
    try {
      const admin = await this.findOneByAccount(account);
      if (!admin) {
        return { code: 401, message: '잘못된 관리자 정보' };
      }
      if (!(await comparePasswordForLogin(password, admin.password))) {
        return { code: 401, message: '잘못된 관리자 정보' };
      }
      const accessToken = await createAccessToken(admin.id);
      const refreshToken = await createRefreshToken();
      if (accessToken === undefined | refreshToken === undefined) {
        throw new Error('token 생성 실패');
      }

      await this.redisUtil.set(refreshToken, admin.id);

      return { code: 200, accessToken, refreshToken, message: '로그인 성공' };
    } catch (err) {
      console.log(err);
      return { code: 500, message: '로그인 실패' };
    }
  }

  findOneByAccount = async (account) => {
    return await this.adminsRepository.findOneByAccount(account);
  };
}

module.exports = AdminsService;
