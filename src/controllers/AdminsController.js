'use strict';

const AdminsService = require('../services/AdminsService');

class AdminsController {
  adminsService = new AdminsService();

  register = async (req, res) => {
    const { account, password } = req.body;
    const adminInfo = { 
      account, 
      password, 
    };
    const createAdminResponse = await this.adminsService.createAdmin(adminInfo);
    if (createAdminResponse.code !== 201) {
      return res.status(createAdminResponse.code).json({ message: createAdminResponse.message });
    }
    const loginResponse = await this.adminsService.login(account, password);
    return res.status(createAdminResponse.code).json({
      message: createAdminResponse.message,
      accessToken: loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken,
    });
  };

  login = async (req, res) => {
    const { account, password } = req.body;
    const response = await this.adminsService.login(account, password);
    return res.status(response.code).json(
      response.code !== 200 ? 
      { message: response.message } : 
      {
        message: response.message,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }
    );
  };
}

module.exports = AdminsController;
