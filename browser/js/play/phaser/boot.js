var RegexGame = RegexGame || {};

RegexGame.Boot = function(){};
//setting game configuration and loading the assets for the loading screen
RegexGame.Boot.prototype = {
  preload: function() {
   //assets we'll use in the loading screen
    this.load.image('logo', 'regexlogo.png');
    this.load.image('preloadbar', 'preloader-bar.png');
  },
  create: function() {
   //loading screen will have a white background
    this.game.stage.backgroundColor = '#000';

      //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = RegexGame.gameConfig.width;
    this.scale.maxHeight = RegexGame.gameConfig.height;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;

    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload', true, false);
  }
};
