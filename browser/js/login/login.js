module.exports = function (app) {
  app.config(require('./config'));
  app.controller('LoginCtrl', require('./controller'));
};
