'use strict';

class OutputController {
  main = (req, res) => {
    res.render('customers/index', {
      components: 'main',
    });
  };

  register = (req, res) => {
    res.render('customers/index', {
      components: 'register',
    });
  };

  login = (req, res) => {
    res.render('customers/index', {
      components: 'login',
    });
  };

  mypage = (req, res) => {
    res.render('customers/index', {
      components: 'mypage',
    });
  };
}

module.exports = OutputController;
