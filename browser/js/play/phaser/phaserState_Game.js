var RegexGame = RegexGame || {};

  //initialize global (for now) vars.
  //these and many properties of Game can become local when modularized into Angular
  let cursors;
  let player;
  
  RegexGame.Game = function () {};

  RegexGame.Game.prototype = {
    quit: function(){
      console.log('inside of quit');
      this.game.destroy();
      this.game.scope.restartGame();
    },
    //two separate pause/unpause funcs. Once paused, you can only manipulate the game object inputs. 
    pause: function(){
      this.game.paused = true;
      this.pauseButton.frame = 4;
      //this should be a group that can be created/destroyed en masse. 
      this.pauseText = new TextOrButton('text', this.game, 0, 20, 'PAUSED', null, null, null, 500);
      this.resume = new TextOrButton('button', this.game, 30, 10, 'Resume', 100, this.unPause, this);
    },
    unPause: function(){
      console.log('inside of unPause');
      //these should be in a group in the future. 
      this.pauseText = this.pauseText || new TextOrButton('text', this.game, 0, 0, 'PAUSED', null, null, null, 500);
      this.resume = this.resume || new TextOrButton('button', this.game, 30, 10, 'Resume', 100, this.unPause, this)
      this.pauseText.text.destroy();
      this.resume.button.destroy();

      this.pauseButton.frame = 3;
      this.game.paused = false;
      
    },
    init: function(track, duration) {
      //angular scope counters
      this.game.scope.numCorrect = 0;
      this.game.scope.numExploded = 0


      this.time.desiredFps = RegexGame.gameConfig.desiredFps;
      this.applause = this.add.audio('applause');
      this.applause.addMarker('playApplause',0,5, .75);

      //dynamic track and duration vals from previous state
      this.track = track;
      this.trackDuration = duration;

      //custom props
      this.transitioned = false;
      this.game.scope.saveScore = false;
      this.game.scope.scoreSubmitted = false;
      this.score = 0;
      this.explosions = []; // change this to a phaser group at some point
    },
    create: function() {
      //start tunes
      this.music = this.add.audio(this.track);
      this.music.addMarker('playBattleTune',0,this.trackDuration, 1, true)
      this.music.play('playBattleTune');

      this.physics.startSystem(Phaser.Physics.ARCADE);

      //create map via custom constructor
      this.map = new Map(this);
      
      //create pause function
      this.pauseButton = this.game.add.sprite(this.game.width-250, 12, 'pausePlay')
      this.pauseButton.inputEnabled = true;
      this.pauseButton.frame = 3;
      this.pauseButton.events.onInputUp.add(this.pause, this);
      this.game.input.onDown.add(this.unPause, this);

      //add text
      this.scoreText = this.add.text(20, 16, 'Score:'+ this.score, { font: '25px gameFont', fill: 'cyan' });
      this.waveText = this.add.text(590, 16, 'Wave:'+ this.game.scope.currentWave, { font: '25px gameFont', fill: 'cyan' });

      //create bombs and player
      this.bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');
      player = new Player(this.game, 32, this.world.height - 150, 'regularDude');
    },


    update: function() {
      cursors = this.input.keyboard.createCursorKeys();

      //player + bomb collision
      if(this.physics.arcade.collide(player, this.bombs, this.bombs.engage, null, this)) {
        //disable phaser keyboard while bomb view engaged
        this.game.input.keyboard.enabled = false;
        //reset phaser keyboard inputs in case phaser failed to do so
        this.input.keyboard.reset();
      }
      //player + obstacle collision
      let playerStopped = () => player.stoppedFalling;
      this.physics.arcade.collide(player, this.map.obstacleLayer, null, playerStopped);

      //increment score + wave
      this.scoreText.text = 'Score:' + this.game.scope.score;
      this.waveText.text = 'Wave:' + this.game.scope.currentWave;

      //check for won wave. delay so applause track can play
      if(this.game.scope.numCorrect === this.bombs.children.length && this.game.scope.numExploded === 0) {
        setTimeout(function() {
          if(!this.applause.isPlaying) this.applause.play('playApplause');
          this.transitionState('NextWave');
        }.bind(this), 1500);
      }
      //lose logic
      else if(this.game.scope.numExploded > 0 || Date.now() >= RegexGame.gameConfig.timeLimit){
        this.bombs.forEach(bomb => {
          if(!bomb.question.disarmed) {
            this.explosions.push(new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode'));
          }
        });
        this.transitionState('GameOver');
      }
    },

    //custom transition state func, destroys bombs, stops music
    transitionState: function(nextState){
      if(!this.transitioned){
        if(this.applause.isPlaying) this.applause.stop();
        this.game.scope.currentBomb = null;
        this.music.stop();
        this.bombs.destroy();
        this.map.destroy();
        setTimeout(function(){
          this.explosions.forEach(explosion => explosion.destroy());
          this.game.state.start(nextState, false, false)
        }.bind(this), RegexGame.gameConfig.levelTimePad);
        this.transitioned = true;
      }
    }
  };
