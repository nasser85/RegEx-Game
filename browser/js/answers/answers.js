module.exports = function (app) {
  app.config(require('./config'));
  app.controller('AnswerCtrl', require('./controller'));
  app.factory('AnswerFactory', require('./factory'));
};
