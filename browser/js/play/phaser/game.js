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
  let applause;
  let groan;
  //set up the actual game state
  RegexGame.Game = function () {};

  RegexGame.Game.prototype = {
    getRandProp: function(obj){
        let keys = Object.keys(obj);
        return obj[keys[Math.floor(Math.random() * keys.length)]];
    },
    generateMap: function(){

      let randMap = this.getRandProp(RegexGame.gameConfig.mapConfig);

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
      console.log(track, duration)
      this.transitioned = false;
      this.game.paused = false;
      this.game.scope.saveScore = false;
      this.game.scope.scoreSubmitted = false;
      this.track = track;
      this.trackDuration = duration;

      //tee up applause track
      applause = this.add.audio('applause');
      applause.addMarker('playApplause',0,5, .75);

      //tee up groan track
      groan = this.add.audio('groan');
      groan.addMarker('playGroan',0,2)

    },
    togglePause: function(){
      this.game.paused = !this.game.paused;
    },
    create: function() {
      //start tunes
      music = this.add.audio(this.track);
      music.addMarker('playBattleTune',0,this.trackDuration, 1, true)
      music.play('playBattleTune');

      //tee-up

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

      //freeze player if they are engaged with bomb
      player.body.moves = !this.game.scope.currentBomb ? true : false;

      //did they win?
      if(this.game.scope.numCorrect === bombs.children.length) {
        if(!applause.isPlaying) applause.play('playApplause');
        this.transitionState('NextWave');
      } //did they lose?
      else if(this.game.scope.numExploded + this.game.scope.numCorrect === bombs.children.length || this.game.scope.numExploded === bombs.children.length || Date.now() >= RegexGame.gameConfig.timeLimit){
        if(!groan.isPlaying) groan.play('playGroan');
        bombs.forEachAlive(bomb => bomb.kill());
      this.transitionState('GameOver');
      }
    },
    transitionState: function(nextState){
      if(!this.transitioned){
        this.game.scope.numCorrect = 0;
        this.game.scope.numExploded = 0
        this.game.scope.currentBomb = null;
        music.stop();
        setTimeout(function(){ this.game.state.start(nextState, false, false, levelStatus)}.bind(this), RegexGame.gameConfig.levelTimePad);
        this.transitioned = true;
      }
    }
  };
