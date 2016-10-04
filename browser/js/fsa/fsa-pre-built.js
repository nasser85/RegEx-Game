var angular = require('angular');

angular.module('fsaPreBuilt', []);

// keep io as a property of the window object for the time being
angular.module('fsaPreBuilt').factory('Socket', require('./factory').Socket);

// AUTH_EVENTS is used throughout our app to
// broadcast and listen from and to the $rootScope
// for important events about authentication flow.
angular.module('fsaPreBuilt').constant('AUTH_EVENTS', require('./constant'));

angular.module('fsaPreBuilt').factory('AuthInterceptor', require('./factory').AuthInterceptor);

angular.module('fsaPreBuilt').config(require('./config'));

angular.module('fsaPreBuilt').service('AuthService', require('./service').AuthService);

angular.module('fsaPreBuilt').service('Session', require('./service').Session);

module.exports = angular.module('fsaPreBuilt').name;
