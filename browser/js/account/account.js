module.exports = function (app) {
  app.config(require('./config'));
  app.controller('AccountCtrl', require('./controller'));
};
