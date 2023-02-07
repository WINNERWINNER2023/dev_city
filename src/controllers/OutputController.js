'use strict';

class OutputController {
  getProduct = (req, res) => {
    const { productId } = req.params;
    res.render('products/details', {
      components: 'products/details',
      productId: parseInt(productId),
    });
  };

  cart = (req, res) => {
    res.render('orders/cart', {
      components: 'orders/cart',
    });
  };

  market = (req, res) => {
    res.render('index', {
      components: 'market',
    });
  };
}

 
module.exports = OutputController;
