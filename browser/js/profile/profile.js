module.exports = function (app) {
  app.config(require('./config'));
  app.controller('ProfileCtrl', require('./controller'));
};
