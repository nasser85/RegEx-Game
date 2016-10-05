module.exports = function($window, $injector) {

  var linkFn = function (scope, ele, attrs) {

    window.RegexGame = require('./phaser/index')(scope);

    var w = angular.element($window);
    w.bind('resize', function(evt) {
      // If the window is resized
    });
  };

  return {
    templateUrl: 'js/play/game-canvas.html',
    link: linkFn
  }
};
