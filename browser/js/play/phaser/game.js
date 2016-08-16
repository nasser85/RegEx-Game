var RegexGame = RegexGame || {};

/*let gameConfig = {
  width: 800,
  height: 600,
  scoreIncrement: 10
}*/

//initialize variables for the game
let bombs;
let platforms;
let player;
let bomb;
let cursors;
let bombArr = [];
let score = 0;
let scoreText;
let explosion = null;
let bombAudio;

function randombomb(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+min));
}

function createBombs (n) {

    for (var i = 0; i < n; i++)
    {
        //  Create a bomb inside of the 'bombs' group
        bomb = bombs.create(randombomb(64, gameConfig.width-64), 0, 'bomb');
        bomb.scale.setTo(.5,.5);
        bomb.stopFalling = randombomb(64, gameConfig.height-64);
        //  Let gravity do its thing
        bomb.body.gravity.y = 300;
        //  This just gives each bomb a slightly random bounce value
        bomb.body.bounce.y = 0.4 + Math.random() * 0.2;
        bomb.question = $scope.questions[$scope.questionIndex];
        bomb.expirationTime = Date.now() + 1000*(i+3);
        bomb.body.collideWorldBounds = true;
        bomb.explosion = game.add.sprite(bomb.position.x-32, bomb.position.y-32, 'explosion');
        bomb.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
        bombArr.push(bomb);
        $scope.incrementQuestionIndex();
    }
}

function collectbomb (player, bomb) {
    $scope.currentBomb = bomb;
    $scope.$evalAsync();
    // Removes the bomb from the screen
    bomb.kill();

    //  Add and update the score
    score += gameConfig.scoreIncrement;
    scoreText.text = 'Score: ' + score;
}

//main game state
RegexGame.Game = function(){};

RegexGame.Game.prototype = {
  create: function() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.refresh();
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'desert');
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    bombs = this.add.group();
    bombs.enableBody = true;
    createBombs(5);
    // The player and its settings
    player = this.add.sprite(32, this.world.height - 150, 'dude');
    //  We need to enable physics on the player
    this.physics.arcade.enable(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.animations.add('down', [4, 3, 0, 1], 10, true);
    //add sound
    bombAudio = this.add.audio('bombExplode');
    bombAudio.allowMultiple = true;
    bombAudio.addMarker('playExplosionSound', 1, 3);
    console.log('game is ', this);


  },
  update: function() {
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(bombs, platforms);
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.arcade.overlap(player, bombs, collectbomb, null, this)

    bombArr.forEach(bomb => {
        if (bomb.alive) {
          if(bomb.position.y >= bomb.stopFalling) {
            bomb.body.velocity.y =0;
            bomb.body.gravity.y = 0;
          }
          if (bomb.expirationTime <= Date.now()) {
            bomb.explosion = this.add.sprite(bomb.position.x-32, bomb.position.y-32, 'explosion');
            bomb.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
            bomb.explosion.animations.play('explode');
            bombAudio.play('playExplosionSound');
            bomb.kill();
          }
        }
    });

//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    //  Allow the player to jump if they are touching the ground.
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.animations.play('down');
    }


    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.animations.play('down');
    }

    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }
  },
};

