'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CoinFlows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      changedAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      remainedAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      changedReason: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CoinFlows');
  }
};