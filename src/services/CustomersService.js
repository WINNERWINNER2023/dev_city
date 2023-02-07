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

  createCustomer = async (email, nickname, password, phone) => {
    const validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식;
    const validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가;
    const validatePhone = /^\d{2,3}-\d{3,4}-\d{4}$/; // 2~3자리 숫자 - 3~4자리 숫자 - 4자리 숫자;
    try {
      // if (email.search(validateEmail) === -1) {
      if (!validateEmail.test(email)) {
        return { code: 401, message: '이메일이 작성 형식과 맞지 않습니다.' };
      }
      if (!validatePassword.test(password)) {
        return { code: 401, message: '비밀번호가 작성 형식과 맞지 않습니다.' };
      }
      if (!validatePhone.test(phone)) {
        return { code: 401, message: '연락처가 작성 형식과 맞지 않습니다.' };
      }
      // 프론트엔드 처리
      // if (!nickname) {
      //   return { code: 401, message: '닉네임이 입력되지 않았습니다.' };
      // }
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
        return { code: 401, message: '입력한 이메일의 계정을 찾을 수 없습니다.' };
      }
      // "입력한 비밀번호의 계정을 찾을 수 없습니다." 에러 - await가 없으면 해당 if문 건너뜀
      const isEqual = await comparePasswordForLogin(password, customer.password);
      if (!isEqual) {
        return { code: 401, message: '입력한 비밀번호의 계정을 찾을 수 없습니다.' };
      }
      const accessToken = await createAccessToken(customer.id);
      const refreshToken = await createRefreshToken();
      if ((accessToken === undefined) | (refreshToken === undefined)) {
        throw new Error('token 생성 실패');
      }
      await this.redisUtil.set(refreshToken, customer.id);
      return {
        code: 200,
        simpleCustomerInfo: {
          id: customer.id,
          email: customer.email,
        },
        accessToken,
        refreshToken,
        message: '로그인이 정상적으로 완료되었습니다.',
        // customerId: loadedCustomer._id.toString(),
      };
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
      // if (!error.code) {
      //   error.code = 500;
      // }
    }
  };

  findOneCustomer = async (customerId) => {
    try {
      return await this.customersRepository.findOneCustomer(customerId);
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
    const validateEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식;
    const validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가;
    const validatePhone = /^\d{2,3}-\d{3,4}-\d{4}$/; // 2~3자리 숫자 - 3~4자리 숫자 - 4자리 숫자;
    try {
      // if (email.search(validateEmail) === -1) {
      if (!validateEmail.test(email)) {
        return { code: 401, message: '이메일이 작성 형식과 맞지 않습니다.' };
      }
      if (!validatePassword.test(password)) {
        return { code: 401, message: '비밀번호가 작성 형식과 맞지 않습니다.' };
      }
      if (!validatePhone.test(phone)) {
        return { code: 401, message: '연락처가 작성 형식과 맞지 않습니다.' };
      }
      // 프론트엔드 처리
      // if (!nickname) {
      //   return { code: 401, message: '닉네임이 입력되지 않았습니다.' };
      // }
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

  addCustomerCoin = async (coin) => {
    try {
      await this.customersRepository.addCustomerCoin(coin);
      return { code: 201, message: '코인 충전을 완료했습니다.' };
    } catch (error) {
      console.log(error.message);
      return { code: 500, message: 'Service - 요청이 올바르지 않습니다.' };
    }
  };

  deleteCustomer = async (customerId) => {
    try {
      await this.customersRepository.deleteCustomer(customerId);
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
