var RegexGame = RegexGame || {};

  //initialize vars
  let bombs;
  let platforms;
  let player;
  let bomb;
  let cursors;
  let map;
  let obstacles;
  let score = 0;
  let scoreText;
  let explosion = null;
  let bombAudio;
  let levelStatus = null;
  let layer;
  let layer2;
  let things;
  //set up the actual game state
  RegexGame.Game = function () {};

  RegexGame.Game.prototype = {
    init: function(){
      this.game.paused = false;
    },
    togglePause: function(){
      this.game.paused = !this.game.paused;
    },
    create: function() {
      //start tunes
      let music = this.add.audio('battleTune');
      music.addMarker('playBattleTune',0,300)
      music.play('playBattleTune');

      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
      this.physics.startSystem(Phaser.Physics.ARCADE);

      //create base map
      map = this.add.tilemap('simpleCity_Layer1');
      map.addTilesetImage('streetTiles');

      layer = map.createLayer(0);
      layer.resizeWorld();

/*      obstacles = this.add.tilemap('simpleCity_Layer2');
      obstacles.addTilesetImage('accessoryTiles');
      layer2 = obstacles.createLayer(0);
      obstacles.setCollision([124,125,140,141,158,159,198,199,200]);*/

      obstacles = this.add.tilemap('simpleCity_Layer3');
      obstacles.addTilesetImage('carTiles');
      //obstacles.addTilesetImage('accessoryTiles');
      layer2 = obstacles.createLayer(0);
      obstacles.setCollision([9,10,11,12,13,41,51,52,53,54,55,56,83,84,85]);
      /*things = this.add.group
      obstacles.createFromObjects('Object Layer 1', 0, )*/

      //create bombs and player
      bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');
      player = new Player(this.game, 32, this.world.height - 150, 'regularDude');
    },
    update: function() {
      cursors = this.input.keyboard.createCursorKeys();

      //deal with collisions
      this.physics.arcade.collide(player, bombs, bombs.engage, null, this);
      this.physics.arcade.collide(player, layer2);
      this.physics.arcade.collide(bombs,layer2)
    }
  };
