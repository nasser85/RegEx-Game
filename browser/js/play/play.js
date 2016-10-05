module.exports = function (app) {
  app.config(require('./config'));
  app.controller('PlayCtrl', require('./controller'));
};
