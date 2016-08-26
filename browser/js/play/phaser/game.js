var RegexGame = RegexGame || {};

  //initialize vars
  let bombs;
  let cursors;
  let obstacles;
  let score = 0;
  let scoreText;
  let explosion = null;
  let bombAudio;
  let waveText;
  let levelStatus = null;
  let player;
  //set up the actual game state
  RegexGame.Game = function () {};

  RegexGame.Game.prototype = {
    init: function(track, duration) {
      //reset counters
      this.game.scope.numCorrect = 0;
      this.game.scope.numExploded = 0

      this.time.desiredFps = RegexGame.gameConfig.desiredFps;
      this.transitioned = false;
      this.game.scope.saveScore = false;
      this.game.scope.scoreSubmitted = false;
      this.track = track;
      this.trackDuration = duration;

      //tee up applause track
      this.applause = this.add.audio('applause');
      this.applause.addMarker('playApplause',0,5, .75);
    },
    togglePause: function(){
      this.game.paused = !this.game.paused;
    },
    create: function() {
      //start tunes
      this.music = this.add.audio(this.track);
      this.music.addMarker('playBattleTune',0,this.trackDuration, 1, true)
      this.music.play('playBattleTune');

      //tee-up
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
      this.physics.startSystem(Phaser.Physics.ARCADE);

      //create map
      this.map = new Map(this);


      scoreText = this.add.text(20, 16, 'Score:'+ score, { font: '25px gameFont', fill: 'cyan' });
      waveText = this.add.text(590, 16, 'Wave:'+ this.game.scope.currentWave, { font: '25px gameFont', fill: 'cyan' });

      //create bombs and player
      bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');
      player = new Player(this.game, 32, this.world.height - 150, 'regularDude');
    },
    update: function() {
      cursors = this.input.keyboard.createCursorKeys();

      //deal with collisions
      if(this.physics.arcade.collide(player, bombs, bombs.engage, null, this)) {
        //let angular access keyboard inputs
        this.game.input.keyboard.enabled = false;
        //reset phaser keyboard input
        this.input.keyboard.reset();
      }
      //enable collision if player is not falling anymore
      let playerStopped = () => player.stoppedFalling;
      this.physics.arcade.collide(player, this.map.obstacleLayer, null, playerStopped);

      scoreText.text = 'Score:' + this.game.scope.score;
      waveText.text = 'Level:' + this.game.scope.currentWave;
      //did they win?
      if(this.game.scope.numCorrect === bombs.children.length && this.game.scope.numExploded === 0) {
        setTimeout(function() {
        if(!this.applause.isPlaying) this.applause.play('playApplause');
        this.transitionState('NextWave');
      }.bind(this), 1500);
      } //did they lose?
      else if(this.game.scope.numExploded > 0 || Date.now() >= RegexGame.gameConfig.timeLimit){
        bombs.forEachAlive(bomb => {
          bomb.explosion = new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode');
        });
        this.transitionState('GameOver');
      }
    },
    transitionState: function(nextState){
      if(!this.transitioned){
        if(this.applause.isPlaying) this.applause.stop();
        this.game.scope.currentBomb = null;
        this.music.stop();
        bombs.destroy();
        setTimeout(function(){ this.game.state.start(nextState, false, false, levelStatus)}.bind(this), RegexGame.gameConfig.levelTimePad);
        this.transitioned = true;
      }
    }
  };
