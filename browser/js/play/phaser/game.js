var RegexGame = RegexGame || {};

  //initialize vars
  let bombs;
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
  let music;
  //set up the actual game state
  RegexGame.Game = function () {

      this.mapConfig = {
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
            },
            c: null
          }
        }
      };

  };

  RegexGame.Game.prototype = {
    getRandProp: function(obj){
        let keys = Object.keys(obj);
        return obj[keys[Math.floor(Math.random() * keys.length)]];
    },
    generateMap: function(){

      let randMap = this.getRandProp(this.mapConfig);

      map = this.add.tilemap(randMap.tilemap);
      map.addTilesetImage(randMap.tilesetImage);
      layer = map.createLayer(0);
      layer.resizeWorld();

      let randObstacle = this.getRandProp(randMap.obstacles);
      if(randObstacle) {
        obstacles = this.add.tilemap(randObstacle.tilemap);
        obstacles.addTilesetImage(randObstacle.tilesetImage);
        obstacles.setCollision(randObstacle.collision);
        layer2 = obstacles.createLayer(0);
      }
    },
    init: function(track, duration){
      this.game.paused = false;
      this.game.scope.scoreSubmitted = false;
      this.track = track;
      this.trackDuration = duration;
    },
    togglePause: function(){
      this.game.paused = !this.game.paused;
    },
    create: function() {
      //start tunes
      music = this.add.audio(this.track);
      music.addMarker('playBattleTune',0,this.trackDuration, 1, true)
      music.play('playBattleTune');

      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
      this.physics.startSystem(Phaser.Physics.ARCADE);

      //create map
      this.generateMap();

      scoreText = this.add.text(16, 16, 'Score: '+ score, { font: '25px gameFont', fill: 'cyan' });

      //create bombs and player
      bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');
      player = new Player(this.game, 32, this.world.height - 150, 'regularDude');
    },
    update: function() {
      cursors = this.input.keyboard.createCursorKeys();
      //deal with collisions
      this.physics.arcade.collide(player, bombs, bombs.engage, null, this);
      this.physics.arcade.collide(player, layer2);
      this.physics.arcade.collide(bombs, layer2, bombs.freeze)

      scoreText.text = 'Score: ' + this.game.scope.score;
      if(this.game.scope.numCorrect === bombs.children.length) {
        bombs.forEachAlive(bomb => bomb.kill())
        this.transitionState('NextWave');
      }
      else if(this.game.scope.numExploded === bombs.children.length || Date.now() >= RegexGame.gameConfig.timeLimit){
      this.transitionState('GameOver');

      }
    },
    transitionState: function(nextState){
      this.game.scope.numCorrect = 0;
      this.game.scope.numExploded = 0
      this.game.scope.currentBomb = null;
      music.stop();
      setTimeout(function(){ this.game.state.start(nextState, false, false, levelStatus)}.bind(this), RegexGame.gameConfig.levelTimePad);
    }
  };
