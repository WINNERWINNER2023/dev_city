'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    static associate(models) {
      this.belongsTo(models.ChatRoom, { foreignKey: 'chatRoomId' });
    }
  }
  ChatMessage.init({
    chatRoomId: DataTypes.INTEGER,
    contents: DataTypes.STRING,
    sender: DataTypes.STRING
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};