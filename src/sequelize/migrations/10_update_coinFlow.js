'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('CoinFlows', 'changedAmount', 'amount');
    await queryInterface.renameColumn('CoinFlows', 'changedReason', 'reason');
    await queryInterface.removeColumn('CoinFlows', 'remainedAmount', {});
  },

  async down(queryInterface, Sequelize) {},
};
