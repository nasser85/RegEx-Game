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

      //map = new Map(this.game, 0, 0, 'desert');
      map = this.add.tilemap('simpleCity_Layer1');
      map.addTilesetImage('tileset1');

      layer = map.createLayer(0);
      layer.resizeWorld();
      //map.setCollision([838,839,840,848,849,850,870,871,872,873,880,881,882,902,903,904,905,912,913,914,939])
      obstacles = this.add.tilemap('simpleCity_Layer2');
      obstacles.addTilesetImage('tileset2');
      layer2 = obstacles.createLayer(0);
      obstacles.setCollision([124,125,140,141,142,143,158,159,174,175,198,199,200,214,215,216]);


      bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');

      player = new Player(this.game, 32, this.world.height - 150, 'regularDude');
    },
    update: function() {
      cursors = this.input.keyboard.createCursorKeys();
      this.physics.arcade.collide(player, bombs, bombs.engage, null, this);

      this.physics.arcade.collide(player, layer2);
      this.physics.arcade.collide(bombs,layer2)
    }
  };
