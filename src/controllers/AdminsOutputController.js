'use strict';

class OutputController {
  main = (req, res) => {
    res.render('admins/index', {
      components: 'main',
    });
  };

  register = (req, res) => {
    res.render('admins/index', {
      components: 'register',
    });
  };

  login = (req, res) => {
    res.render('admins/index', {
      components: 'login',
    });
  };

  productsList = (req, res) => {
    res.render('admins/index', {
      components: 'products/list',
    });
  };

  productsCreate = (req, res) => {
    res.render('admins/index', {
      components: 'products/create',
    });
  };

  productsDetail = (req, res) => {
    const { productId } = req.params;
    res.render('admins/index', {
      components: 'products/details',
      productId: parseInt(productId),
    });
  };
}

module.exports = OutputController;
