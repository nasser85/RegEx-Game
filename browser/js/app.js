require('jquery');

var angular = require('angular');

// var console = {
//   log: function () {}
// };

var app = angular.module('FullstackGeneratedApp', [
  require('./fsa/fsa-pre-built'),
  require('angular-ui-router'),
  require('angular-ui-bootstrap'),
  require('angular-animate')
]);

app.config(require('./app-functions/config'));

// This app.run is for controlling access to specific states.
app.run(require('./app-functions/run'));

require('./account/account')(app);
require('./answers/answers')(app);
require('./common/directives/regexrace-logo/regexrace-logo')(app);
require('./common/factories/index')(app);
require('./home/home')(app);
require('./login/login')(app);
require('./play/gameCanvas')(app);
require('./play/play')(app);
require('./profile/profile')(app);
require('./question/bomb-view.directive')(app);
require('./question/defuse.directive')(app);
require('./question/defuseResult.directive')(app);
require('./question/question.factory')(app);
require('./score/save-score.directive')(app);
require('./sign-up/game-end-sign-up')(app);
require('./sign-up/signup.directive')(app);
require('./sign-up/signup')(app);
require('./user/user.factory')(app);
