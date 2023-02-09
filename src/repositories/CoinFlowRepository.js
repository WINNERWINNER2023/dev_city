'use strict';

require('dotenv').config();

class CoinFlowRepository {
  pageLimit = parseInt(process.env.ADMINS_PAGE_LIMIT);

  constructor(model) {
    this.model = model;
  }

  createCoinFlow = async (transaction, customerId, orderId, totalPrice) => {
    await this.model.create({
      customerId,
      orderId,
      amount : totalPrice,
      reason : "상품 구매"
    },
    { transaction }
    )
  }
}

module.exports = CoinFlowRepository;
