'use strict';

require('dotenv').config();
class SubOrderRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

  constructor(model) {
    this.model = model;
  }

  getSubOrderListByOrderId = async (orderId) => {
    return await this.model.findAll({
      raw: true,
      where: { orderId },
    });
  };

  createSubOrder = async (transaction, orderId, productId) => {
    await this.model.create({
      orderId,
      productId,
    },
    { transaction }
    );
  };
}

module.exports = SubOrderRepository;
