app.directive('gameCanvas', function($window, $injector) {

  var linkFn = function(scope, ele, attrs) {

    scope.gameConfig = {
      width: 800,
      height: 600,
      scoreIncrement: 10
    }

    RegexGame.game = new Phaser.Game(scope.gameConfig.width, scope.gameConfig.height, Phaser.AUTO, 'playGame');

    RegexGame.game.scope = scope;

    RegexGame.game.state.add('Boot', RegexGame.Boot);
    RegexGame.game.state.add('Preload', RegexGame.Preload);
    RegexGame.game.state.add('MainMenu', RegexGame.MainMenu);
    RegexGame.game.state.add('Game', RegexGame.Game);
    RegexGame.game.state.start('Boot');

    var w = angular.element($window);
    w.bind('resize', function(evt) {
      // If the window is resized
    });


//DOING THIS IS THE KEY TO PASSING SCOPE INTO THE GAME
/*    mySocket.then(function(sock) {
      require('./main.js')(
        ele, scope, sock,
        scope.ngModel,
        scope.mapId,
        $injector);
    });*/
  };

  return {
/*    scope: {
      ngModel: '=',
      mapId: '='
    },*/
    template: '<div ng-class="currentBomb ? \'blurry\' : \'not-blurry\'" id=\'playGame\' balls></div><bomb-view ng-if="currentBomb" ></bomb-view>',
    link: linkFn
  }
})
