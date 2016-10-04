module.exports = function (app) {
  app.config(require('./config'));
  app.controller('HomeCtrl', require('./controller'));
};
