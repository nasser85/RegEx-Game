module.exports = function (scope) {
  var RegexGame = {};

  RegexGame.gameConfig = require('./game_config')

  //create game as property of RegexGame
  RegexGame.game = new Phaser.Game(RegexGame.gameConfig.width, RegexGame.gameConfig.height, Phaser.AUTO, 'playGame');

  RegexGame.game.scope = scope;

  //append states to the game
  require('./phaserState_Boot')(RegexGame);
  require('./phaserState_Preload')(RegexGame);
  require('./phaserState_GameMenu')(RegexGame);
  require('./phaserState_GameOver')(RegexGame);
  require('./phaserState_Game')(RegexGame);
  require('./phaserState_NextWave')(RegexGame);

  RegexGame.game.state.add('Boot', RegexGame.Boot);
  RegexGame.game.state.add('Preload', RegexGame.Preload);
  RegexGame.game.state.add('GameMenu', RegexGame.GameMenu);
  RegexGame.game.state.add('GameOver', RegexGame.GameOver);
  RegexGame.game.state.add('Game', RegexGame.Game);
  RegexGame.game.state.add('NextWave', RegexGame.NextWave);

  //kick off the first state
  RegexGame.game.state.start('Boot');

  return RegexGame;
};
