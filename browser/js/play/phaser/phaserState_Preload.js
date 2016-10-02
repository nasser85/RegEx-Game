var RegexGame = RegexGame || {};

//loading the game assets
RegexGame.Preload = function(){};

RegexGame.Preload.prototype = {
  preload: function() {
   //show preloadBar in loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

   //load tilemaps and sets
    this.load.tilemap('simpleCity_Layer1', '/maps/simpleCity_SimpleCity_Layer1.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('simpleCity_Layer2', '/maps/simpleCity_SimpleCity_Layer2.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('simpleCity_Layer3', '/maps/simpleCity_SimpleCity_Layer3.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('parkCity_Layer1', '/maps/parkCity_Tile Layer 1.csv', null, Phaser.Tilemap.CSV);
    this.load.tilemap('parkCity_Layer2', '/maps/parkCity_Tile Layer 2.csv', null, Phaser.Tilemap.CSV);
    this.load.image('streetTiles', './images/TileA5.png');
    this.load.image('accessoryTiles', './images/TileB.png');
    this.load.image('carTiles', './images/TileD.png');

    //load in-game images
    this.load.image('smiley', './images/smiley.png');
    this.load.spritesheet('regularDude', './images/regularDude.png', 32, 48);
    this.load.spritesheet('bomb', './images/bombs.png', 128, 128,2);
    this.load.spritesheet('explosion', './images/explosion2.png', 128, 128);
    this.load.spritesheet('gamebuttons', './images/gamebuttons.png', 150,40);
    this.load.image('dudeLogo', './images/regexlogo2.png');
    this.load.spritesheet('pausePlay', './images/control-sprite.png', 32, 32);

    //load sounds
    this.load.audio('bombExplode', '/sound/time_bomb_short.mp3');
    this.load.audio('groan', '/sound/crowd-groan.mp3')
    this.load.audio('applause', '/sound/applause3.mp3');
    this.load.audio('theme', '/sound/theme.mp3');
    this.load.audio('battleA', '/sound/battleA.mp3');
    this.load.audio('battleB', '/sound/battleB.mp3');
    this.load.audio('filler', '/sound/fillerLoop.mp3')
    this.load.audio('nextWave', '/sound/nextWave.mp3')

  },
  create: function() {
   this.state.start('GameMenu', true, false);
  }
};

