'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ChatMessages', {
      // FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ['chatRoomId'], // FK로 등록할 필드 이름
      type: 'foreign key',
      name: 'ChatRooms_ChatMessages_chatRoomId_fk',
      references: {
        table: 'ChatRooms', // 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: 'id', // 참조할 필드 이름
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('CoinFlows', {
      // FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ['customerId'], // FK로 등록할 필드 이름
      type: 'foreign key',
      name: 'Customers_CoinFlows_customerId_fk',
      references: {
        table: 'Customers', // 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: 'id', // 참조할 필드 이름
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('CoinFlows', {
      // FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ['orderId'], // FK로 등록할 필드 이름
      type: 'foreign key',
      name: 'Orders_CoinFlows_orderId_fk',
      references: {
        table: 'Orders', // 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: 'id', // 참조할 필드 이름
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Orders', {
      // FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ['customerId'], // FK로 등록할 필드 이름
      type: 'foreign key',
      name: 'Customers_Orders_customerId_fk',
      references: {
        table: 'Customers', // 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: 'id', // 참조할 필드 이름
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('SubOrders', {
      // FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ['orderId'], // FK로 등록할 필드 이름
      type: 'foreign key',
      name: 'Orders_SubOrders_orderId_fk',
      references: {
        table: 'Orders', // 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: 'id', // 참조할 필드 이름
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('SubOrders', {
      // FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ['productId'], // FK로 등록할 필드 이름
      type: 'foreign key',
      name: 'Products_SubOrders_productId_fk',
      references: {
        table: 'Products', // 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: 'id', // 참조할 필드 이름
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {},
};
