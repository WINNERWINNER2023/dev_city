'use strict';

class AdminsRepository {
  constructor(model) {
    this.model = model;
  }

  createAdmin = async (adminInfo) => {
    await this.model.create({
      account: adminInfo.account,
      password: adminInfo.password,
    });
  };

  findOneByAccount = async (account) => {
    return await this.model.findOne({ where: { account } });
  }
}

module.exports = AdminsRepository;
