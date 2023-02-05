'use strict';

require('dotenv').config();
const CustomersRepository = require('../repositories/CustomersRepository');
const { Customer } = require('../sequelize/models');

const PaginationUtil = require('../utils/PaginationUtil');

class CustomersService {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);
  sectionLimit = parseInt(process.env.ADMINS_SECTION_LIMIT);

  customersRepository = new CustomersRepository(Customer);

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
