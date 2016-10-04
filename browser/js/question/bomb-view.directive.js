module.exports = function (app) {
  app.directive('bombView', require('./directive').bombView);
};
