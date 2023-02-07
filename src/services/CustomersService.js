'use strict';

require('dotenv').config();

const CustomersRepository = require('../repositories/CustomersRepository');
const { Customer } = require('../sequelize/models');

const { encryptPassword, comparePasswordForLogin } = require('../utils/bcryptUtil');
const { createAccessToken, createRefreshToken } = require('../utils/TokenUtil');
const RedisUtil = require('../utils/RedisUtil');
const PaginationUtil = require('../utils/PaginationUtil');

class CustomersService {
  customersRepository = new CustomersRepository(Customer);
  redisUtil = new RedisUtil();

  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  validateEmail = process.env.VALIDATE_EMAIL;
  validatePassword = process.env.VALIDATE_PASSWORD;
  validatePhone = process.env.VALIDATE_PHONE;

  createCustomer = async (email, nickname, password, phone) => {
    try {
      if (!this.validateEmail.test(email)) {
        return { code: 401, message: '이메일이 작성 형식과 맞지 않습니다.' };
      }
      if (!this.validatePassword.test(password)) {
        return { code: 401, message: '비밀번호가 작성 형식과 맞지 않습니다.' };
      }
      if (!this.validatePhone.test(phone)) {
        return { code: 401, message: '연락처가 작성 형식과 맞지 않습니다.' };
      }
      const duplicateCustomerEmail = await this.findCustomerByEmail(email);
      if (duplicateCustomerEmail) {
        return { code: 401, message: '중복되는 이메일 계정이 있습니다' };
      }
      const duplicateCustomerNickname = await this.findCustomerByNickname(nickname);
      if (duplicateCustomerNickname) {
        return { code: 401, message: '중복되는 닉네임이 있습니다' };
      }
      password = await encryptPassword(password);
      await this.customersRepository.createCustomer(email, nickname, password, phone);
      return { code: 201, message: '회원가입에 성공하셨습니다.' };
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  loginCustomer = async (email, password) => {
    try {
      const customer = await this.findCustomerByEmail(email);
      if (!customer) {
        return { code: 401, message: '입력한 이메일 계정이 존재하지 않습니다.' };
      }
      const isEqual = await comparePasswordForLogin(password, customer.password);
      if (!isEqual) {
        return { code: 401, message: '입력한 비밀번호 계정이 존재하지 않습니다.' };
      }
      const accessToken = await createAccessToken(customer.id);
      const refreshToken = await createRefreshToken();
      if ((accessToken === undefined) | (refreshToken === undefined)) {
        throw new Error('token 생성 실패');
      }
      await this.redisUtil.set(refreshToken, customer.id);
      return { code: 200, accessToken, refreshToken, message: '로그인이 정상적으로 완료되었습니다.' };
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  findOneCustomer = async (id) => {
    try {
      return await this.customersRepository.findOneCustomer(id);
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  findCustomerByEmail = async (email) => {
    try {
      return await this.customersRepository.findCustomerByEmail(email);
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  findCustomerByNickname = async (nickname) => {
    try {
      return await this.customersRepository.findCustomerByNickname(nickname);
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  changeCustomer = async (email, nickname, password, phone) => {
    try {
      if (!this.validateEmail.test(email)) {
        return { code: 401, message: '이메일이 작성 형식과 맞지 않습니다.' };
      }
      if (!this.validatePassword.test(password)) {
        return { code: 401, message: '비밀번호가 작성 형식과 맞지 않습니다.' };
      }
      if (!this.validatePhone.test(phone)) {
        return { code: 401, message: '연락처가 작성 형식과 맞지 않습니다.' };
      }
      const duplicateCustomerEmail = await this.findCustomerByEmail(email);
      if (duplicateCustomerEmail) {
        return { code: 401, message: '중복되는 이메일 계정이 있습니다' };
      }
      const duplicateCustomerNickname = await this.findCustomerByNickname(nickname);
      if (duplicateCustomerNickname) {
        return { code: 401, message: '중복되는 닉네임이 있습니다' };
      }
      password = await encryptPassword(password);
      await this.customersRepository.changeCustomer(email, nickname, password, phone);
      return { code: 201, message: '회원 정보를 수정했습니다.' };
    } catch (error) {
      console.log(error.message);
      return { code: 401, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  addCustomerCoin = async (id) => {
    try {
      await this.customersRepository.addCustomerCoin(id);
      return { code: 201, message: '코인 충전을 완료했습니다.' };
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  deleteCustomer = async (id) => {
    try {
      await this.customersRepository.deleteCustomer(id);
      return { code: 201, message: '회원 탈퇴가 완료되었습니다.' };
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  adminGetCustomers = async (page) => {
    try {
      const customers = await this.customersRepository.adminGetCustomers(page);
      if (customers.length === 0) {
        return { code: 404, message: '해당하는 유저 목록 없음' };
      }
      const customersCountAll = await this.customersRepository.adminGetCustomersCountAll();
      const paginationUtil = new PaginationUtil(page, customersCountAll.countAll, this.pageLimit, this.sectionLimit);
      return { code: 200, data: customers, pagination: paginationUtil.render() };
    } catch (err) {
      return { code: 500, message: '유저 목록 조회 실패' };
    }
  };
}
module.exports = CustomersService;
