'use strict';

const AdminsService = require('../services/AdminsService');

class AdminsController {
  adminsService = new AdminsService();
}

module.exports = AdminsController;
