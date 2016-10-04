module.exports = function (app) {
  app.directive('enter', require('./directive').enter);
  app.directive('esc', require('./directive').esc);
};
