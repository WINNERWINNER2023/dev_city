'use strict';

require('dotenv').config();

const CustomersRepository = require('../repositories/CustomersRepository');
const { Customer } = require('../sequelize/models');

const { encryptPassword } = require('../utils/bcryptUtil');
// const { createAccessToken, createRefreshToken } = require('../utils/TokenUtil');

const RedisUtil = require('../utils/RedisUtil');
const PaginationUtil = require('../utils/PaginationUtil');

class CustomersService {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  customersRepository = new CustomersRepository(Customer);
  redisUtil = new RedisUtil();

  createCustomer = async (customerInfo) => {
    const validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식;
    const validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가;
    const validatePhone = /^\d{2,3}-\d{3,4}-\d{4}$/; // 2~3자리 숫자 - 3~4자리 숫자 - 4자리 숫자;
    try {
      if (customerInfo.email.search(validateEmail) === -1) {
        return { code: 400, message: '이메일이 작성 형식과 맞지 않습니다.' };
      }
      if (!validatePassword.test(customerInfo.password)) {
        return { code: 400, message: '비밀번호가 작성 형식과 맞지 않습니다.' };
      }
      if (!validatePhone.test(customerInfo.phone)) {
        return { code: 400, message: '연락처가 작성 형식과 맞지 않습니다.' };
      }
      if (!customerInfo.nickname) {
        return { code: 400, message: '닉네임이 입력되지 않았습니다.' };
      }
      const duplicateCustomerEmail = await this.findCustomerByEmail(customerInfo.email);
      if (duplicateCustomerEmail) {
        return { code: 401, message: '이미 중복되는 이메일 계정이 있습니다' };
      }
      const duplicateCustomerNickname = await this.findCustomerByNickname(customerInfo.nickname);
      if (duplicateCustomerNickname) {
        return { code: 401, message: '이미 중복되는 닉네임이 있습니다' };
      }
      customerInfo.password = await encryptPassword(customerInfo.password);
      const registeredCustomerInfo = await this.customersRepository.createCustomer(customerInfo);
      return { code: 201, message: '회원가입에 성공하셨습니다.', data: registeredCustomerInfo };
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  findOneCustomer = async (customerId) => {
    try {
      const findOneCustomerInfo = await this.customersRepository.findOneCustomer(customerId);
      return findOneCustomerInfo;
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  findCustomerByEmail = async (email) => {
    try {
      const findCustomerEmail = await this.customersRepository.findCustomerByEmail(email);
      return findCustomerEmail;
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  findCustomerByNickname = async (nickname) => {
    try {
      const findCustomerNickname = await this.customersRepository.findCustomerByNickname(nickname);
      return findCustomerNickname;
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  // 유효성검사 추가필요
  changeCustomer = async (email, nickname, password, phone) => {
    try {
      password = await encryptPassword(password);
      const changeCustomerInfo = await this.customersRepository.changeCustomer(email, nickname, password, phone);
      return { code: 201, message: '회원 정보를 수정했습니다.', data: changeCustomerInfo };
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  addCustomerCoin = async (coin) => {
    try {
      const addedCustomerCoinInfo = await this.customersRepository.addCustomerCoin(coin);
      return { code: 201, message: '코인 충전을 완료했습니다.', data: addedCustomerCoinInfo };
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  deleteCustomer = async (customerId) => {
    try {
      const deleteCustomerInfo = await this.customersRepository.deleteCustomer(customerId);
      return { code: 201, message: '회원 탈퇴가 완료되었습니다.', data: deleteCustomerInfo };
    } catch (error) {
      console.log(error.message);
      return { code: 400, message: 'Service - 요청이 올바르지 않습니다.' };
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
