var RegexGame = RegexGame || {};

RegexGame.Boot = function(){};

RegexGame.Boot.prototype = {
  preload: function() {
   //assets we'll use in the loading screen
    this.load.image('logo', './images/regexlogo.png');
    this.load.image('preloadbar', './images/preloader-bar.png');
  },
  create: function() {
   //loading screen will have a white background
    this.game.stage.backgroundColor = '#000';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = RegexGame.gameConfig.width;
    this.scale.maxHeight = RegexGame.gameConfig.height;

    //have the game centered
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.refresh();
    //start physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //start next state
    this.state.start('Preload', true, false);
  }
};
