var RegexGame = RegexGame || {};
    //initialize vars
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

    function createBombs (n) {

        for (var i = 0; i < n; i++) {

            bomb.explosion = this.game.add.sprite(bomb.position.x-32, bomb.position.y-32, 'explosion');
            bomb.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
            bombArr.push(bomb);
        }
    }

    //set up the actual game state
    RegexGame.Game = function(){};

    RegexGame.Game.prototype = {
      create: function() {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //  A simple background for our game
        this.add.sprite(0, 0, 'desert');
        // add the score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        bombs = new BombGroup(this.game, this.game.scope.questions, 'bomb');

        // player = this.add.sprite(32, this.world.height - 150, 'dude');
        player = new Player(this.game, 32, this.world.height - 150, 'dude');
        this.game.add.existing(player);

        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('down', [4, 3, 0, 1], 10, true);
        //add sound
        bombAudio = this.add.audio('bombExplode');
        bombAudio.allowMultiple = true;
        bombAudio.addMarker('playExplosionSound', 1, 3);
      },
      update: function() {
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(bombs, platforms);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.arcade.overlap(player, bombs, bombs.engage, null, this)

        // bombArr.forEach(bomb => {
        //     if (bomb.alive) {
        //       if(bomb.position.y >= bomb.stopFalling) {
        //         bomb.body.velocity.y =0;
        //         bomb.body.gravity.y = 0;
        //       }
        //       if (bomb.expirationTime <= Date.now()) {
        //         bomb.explosion = this.add.sprite(bomb.position.x-32, bomb.position.y-32, 'explosion');
        //         bomb.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
        //         bomb.explosion.animations.play('explode');
        //         bombAudio.play('playExplosionSound');
        //         bomb.kill();
        //       }
        //     }
        // });

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
    }
