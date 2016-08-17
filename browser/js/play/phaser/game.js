var RegexGame = RegexGame || {};

  //initialize vars
  let bombs;
  let platforms;
  let player;
  let bomb;
  let cursors;
  let map;
  let score = 0;
  let scoreText;
  let explosion = null;
  let bombAudio;
  let levelStatus = null;

  //set up the actual game state
  RegexGame.Game = function () {};

  RegexGame.Game.prototype = {
    create: function() {
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();
      this.physics.startSystem(Phaser.Physics.ARCADE);

      map = new Map(this.game, 0, 0, 'desert');
      // add the score
      /*scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });*/

      bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');

      player = new Player(this.game, 32, this.world.height - 150, 'dude');
    },
    update: function() {
      cursors = this.input.keyboard.createCursorKeys();
      this.physics.arcade.collide(player, bombs, bombs.engage, null, this);
    }
  };
