module.exports = function (app) {
  app.config(require('./config'));
  app.controller('SignUpCtrl', require('./controller').SignUpCtrl);
};
