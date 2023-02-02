'use strict';

const ChatsService = require('../services/ChatsService');

class ChatsController {
  chatsService = new ChatsService();
}

module.exports = ChatsController;
