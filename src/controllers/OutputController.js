'use strict';

class OutputController {
  main = (req, res) => {
    res.render('index');
  };

  getProducts = (req, res) => {
    res.render('index', {
      components: 'products/list',
    });
  };

  getProduct = (req, res) => {
    const { productId } = req.params;
    res.render('index', {
      components: 'products/details',
      productId: parseInt(productId),
    });
  };

  cart = (req, res) => {
    res.render('index', {
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
