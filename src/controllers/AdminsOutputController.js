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
}

module.exports = OutputController;
