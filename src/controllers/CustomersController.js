'use strict';

const CustomersService = require('../services/CustomersService');

class CustomersController {
  customersService = new CustomersService();

  registerCustomer = async (req, res) => {
    try {
      const { email, nickname, password, phone } = req.body;
      const registeredCustomerInfo = await this.customersService.createCustomer(email, nickname, password, phone);
      if (typeof registeredCustomerInfo.message !== 'undefined') {
        return res.status(registeredCustomerInfo.code).json({ message: registeredCustomerInfo.message });
      }
      return res.status(201).json({ message: '회원가입에 성공하였습니다.', data: registeredCustomerInfo });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };

  findOneCustomer = async (req, res) => {
    try {
      const { customerId } = req.body;
      const findOneCustomerInfo = await this.customersService.findOneCustomer(customerId);
      if (typeof findOneCustomerInfo.message !== 'undefined') {
        return res.status(findOneCustomerInfo.code).json({ message: findOneCustomerInfo.message });
      }
      return res.status(200).json({ message: '회원 정보를 불러왔습니다.', data: findOneCustomerInfo });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };

  changeCustomer = async (req, res) => {
    try {
      const { email, nickname, password, phone } = req.body;
      const updatedCustomerInfo = await this.customersService.changeCustomer(email, nickname, password, phone);
      if (typeof updatedCustomerInfo.message !== 'undefined') {
        return res.status(updatedCustomerInfo.code).json({ message: updatedCustomerInfo.message });
      }
      return res.status(201).json({ message: '회원 정보가 수정되었습니다.' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };

  addCustomerCoin = async (req, res) => {
    try {
      const { coin } = req.body;
      const updatedCustomerCoinInfo = await this.customersService.addCustomerCoin(coin);
      if (typeof updatedCustomerCoinInfo.message !== 'undefined') {
        return res.status(updatedCustomerCoinInfo.code).json({ message: updatedCustomerCoinInfo.message });
      }
      return res.status(201).json({ message: '코인 충전을 완료했습니다.' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };

  deleteCustomer = async (req, res) => {
    try {
      const { customerId } = req.body;
      const deleteCustomerInfo = await this.customersService.deleteCustomer(customerId);
      if (typeof deleteCustomerInfo.message !== 'undefined') {
        return res.status(deleteCustomerInfo.code).json({ message: deleteCustomerInfo.message });
      }
      return res.status(204).json({ message: '회원 탈퇴가 완료되었습니다.' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };

  loginCustomer = async (req, res) => {
    try {
      const { email, password } = req.body;
      const loginCustomerInfo = await this.customersService.loginCustomer(email, password);
      if (typeof loginCustomerInfo.message !== 'undefined') {
        return res.status(loginCustomerInfo.code).json({ message: loginCustomerInfo.message });
      }
      return res.status(200).json({
        message: '로그인이 정상적으로 완료되었습니다',
        accessToken: loginCustomerInfo.accessToken,
        refreshToken: loginCustomerInfo.refreshToken,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };

  adminGetCustomers = async (req, res) => {
    const page = parseInt(req.query.p || 1);
    const response = await this.customersService.adminGetCustomers(page);
    return res
      .status(response.code)
      .json(response.code === 200 ? { data: response.data, pagination: response.pagination } : { message: response.message });
  };
}
module.exports = CustomersController;
