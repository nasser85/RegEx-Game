app.directive('gameCanvas', function($window, $injector) {

  var linkFn = function(scope, ele, attrs) {

    RegexGame.gameConfig = {
      width: 800,
      height: 600,
      timeLimit: 0,
      levelTimePad: 2000,
      mapConfig: {
        mapA: {
          tilemap: 'simpleCity_Layer1',
          tilesetImage: 'streetTiles',
          obstacles: {
            a: {
              tilemap: 'simpleCity_Layer2',
              tilesetImage: 'accessoryTiles',
              collision: [124,125,140,141,158,159,198,199,200]
            },
            b: {
              tilemap: 'simpleCity_Layer3',
              tilesetImage: 'carTiles',
              collision: [9,10,11,12,13,41,51,52,53,54,55,56,83,84,85]
            }
          }
        },
        mapB: {
          tilemap: 'parkCity_Layer1',
          tilesetImage: 'streetTiles',
          obstacles: {
            a: {
              tilemap: 'parkCity_Layer2',
              tilesetImage: 'accessoryTiles',
              collision: [98, 122, 123, 140, 141]
            }
          }
        }
      }
    }

    RegexGame.game = new Phaser.Game(RegexGame.gameConfig.width, RegexGame.gameConfig.height, Phaser.AUTO, 'playGame');
    RegexGame.game.scope = scope;

    RegexGame.game.state.add('Boot', RegexGame.Boot);
    RegexGame.game.state.add('Preload', RegexGame.Preload);
    RegexGame.game.state.add('GameOver', RegexGame.GameOver);
    RegexGame.game.state.add('GameMenu', RegexGame.GameMenu);
    RegexGame.game.state.add('Game', RegexGame.Game);
    RegexGame.game.state.add('NextWave', RegexGame.NextWave);
    RegexGame.game.state.start('Boot');

    var w = angular.element($window);
    w.bind('resize', function(evt) {
      // If the window is resized
    });
  };

  return {
    template: `<div ng-class="currentBomb || saveScore ? \'blurry\' : \'not-blurry\'" id=\'playGame\' balls></div>
              <bomb-view ng-if="currentBomb" ></bomb-view>
              <save-score ng-show="saveScore" ></save-score>`,
    link: linkFn
  }
})
