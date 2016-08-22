app.directive('gameCanvas', function($window, $injector) {

  var linkFn = function(scope, ele, attrs) {

    RegexGame.gameConfig = {
      width: 800,
      height: 600,
      timeLimit: 0,
      levelTimePad: 2000
    }

    RegexGame.game = new Phaser.Game(RegexGame.gameConfig.width, RegexGame.gameConfig.height, Phaser.AUTO, 'playGame');
console.log(RegexGame);
    RegexGame.game.scope = scope;

    RegexGame.game.state.add('Boot', RegexGame.Boot);
    RegexGame.game.state.add('Preload', RegexGame.Preload);
    RegexGame.game.state.add('GameOver', RegexGame.GameOver);
    RegexGame.game.state.add('MainMenu', RegexGame.MainMenu);
    RegexGame.game.state.add('Game', RegexGame.Game);
    RegexGame.game.state.add('NextWave', RegexGame.NextWave);
    RegexGame.game.state.start('Boot');

    var w = angular.element($window);
    w.bind('resize', function(evt) {
      // If the window is resized
    });
  };

  return {
    template: `<div><h4>Welcome, {{user.user_name}}</h4></div>
              <div ng-class="currentBomb || saveScore ? \'blurry\' : \'not-blurry\'" id=\'playGame\' balls></div>
              <bomb-view ng-if="currentBomb" ></bomb-view>
              <save-score ng-if="saveScore" ></save-score>`,
    link: linkFn
  }
})
