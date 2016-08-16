var RegexGame = RegexGame || {};

//loading the game assets
RegexGame.Preload = function(){};

RegexGame.Preload.prototype = {
  preload: function() {
   //show logo in loading screen
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

   //load game assets
    this.load.image('desert', 'desert.png');
    this.load.spritesheet('dude', 'dude.png', 32, 48);
    this.load.spritesheet('bomb', 'bombs.png', 128, 128);
    this.load.spritesheet('explosion', 'explosion2.png', 128, 128);
    this.load.audio('bombExplode', 'time_bomb_short.mp3');
    this.load.audio('menuBumper', '/sound/menu_bumper.mp3');

  },
  create: function() {
   this.state.start('MainMenu');
  }
};
