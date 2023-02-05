'use strict';

const CustomersService = require('../services/CustomersService');

class CustomersController {
  customersService = new CustomersService();
  registerCustomer = async (req, res) => {
    try {
      const { email, nickname, password, phone } = req.body;
      const customerInfo = { email, nickname, password, phone };
      const registeredCustomerInfo = await this.customersService.createCustomer(customerInfo);
      if (typeof registeredCustomerInfo.message !== 'undefined') {
        return res.status(registeredCustomerInfo.code).json({ message: registeredCustomerInfo.message });
      }
      res.status(201).json({ message: '회원가입에 성공하셨습니다.', data: registeredCustomerInfo });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };
  findOneCustomer = async (req, res) => {
    try {
      const { customerId } = req.body;
      const findOneCustomerInfo = await this.customersService.findOneCustomer(customerId);
      if (typeof findOneCustomerInfo.message !== 'undefined') {
        return res.status(findOneCustomerInfo.code).json({ message: findOneCustomerInfo.message });
      }
      res.status(201).json({ message: '회원 정보를 불러왔습니다.', data: findOneCustomerInfo });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };
  changeCustomer = async (req, res) => {
    try {
      const { email, nickname, password, phone } = req.body;
      const updatedCustomerInfo = await this.customersService.changeCustomer(email, nickname, password, phone);
      if (typeof updatedCustomerInfo.message !== 'undefined') {
        return res.status(updatedCustomerInfo.code).json({ message: updatedCustomerInfo.message });
      }
      res.status(201).json({ message: '회원 정보가 수정되었습니다.' });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };
  addCustomerCoin = async (req, res) => {
    try {
      const { coin } = req.body;
      const updatedCustomerCoinInfo = await this.customersService.addCustomerCoin(coin);
      if (typeof updatedCustomerCoinInfo.message !== 'undefined') {
        return res.status(updatedCustomerCoinInfo.code).json({ message: updatedCustomerCoinInfo.message });
      }
      res.status(201).json({ message: '회원 정보가 수정되었습니다.' });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };
  deleteCustomer = async (req, res) => {
    try {
      const { customerId } = req.body;
      const deleteCustomerInfo = await this.customersService.deleteCustomer(customerId);
      if (typeof deleteCustomerInfo.message !== 'undefined') {
        return res.status(deleteCustomerInfo.code).json({ message: deleteCustomerInfo.message });
      }
      res.status(201).json({ message: '회원 탈퇴가 되었습니다.' });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: 'Controller - 요청이 올바르지 않습니다.' });
    }
  };
}
module.exports = CustomersController;
