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
    this.load.tilemap('simpleCity_Layer1', '/maps/simpleCity_SimpleCity_Layer1.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('simpleCity_Layer2', '/maps/simpleCity_SimpleCity_Layer2.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('simpleCity_Layer3', '/maps/simpleCity_SimpleCity_Layer3.csv', null, Phaser.Tilemap.CSV);
    this.load.image('streetTiles', 'TileA5.png')
    this.load.image('accessoryTiles', 'TileB.png')
    this.load.image('carTiles', 'TileD.png')
    this.load.image('smiley', 'smiley.png');
    this.load.spritesheet('regularDude', 'regularDude.png', 32, 48)
    this.load.spritesheet('bomb', 'bombs.png', 128, 128,2);
    this.load.spritesheet('explosion', 'explosion2.png', 128, 128);
    this.load.audio('bombExplode', '/sound/time_bomb_short.mp3');
    this.load.audio('menuBumper', '/sound/menu_bumper.mp3');
    this.load.audio('battleTune', '/sound/Battle_Draft.mp3');

  },
  create: function() {
   this.state.start('MainMenu');
  }
};

