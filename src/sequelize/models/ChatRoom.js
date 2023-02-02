'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    static associate(models) {
      this.hasMany(models.ChatMessage, { foreignKey: 'chatRoomId' });
    }
  }
  ChatRoom.init({
    name: DataTypes.STRING,
    user: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};