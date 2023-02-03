'use strict';

class AdminsRepository {
  constructor(Admin) {
    this.Admin = Admin;
  }

  createAdmin = async (adminInfo) => {
    await this.Admin.create({
      account: adminInfo.account,
      password: adminInfo.password,
    });
  };

  findOneByAccount = async (account) => {
    return await this.Admin.findOne({ where: { account } });
  }

  findOneById = async (id) => {
    return await this.Admin.findByPk(id);
  }
}

module.exports = AdminsRepository;
