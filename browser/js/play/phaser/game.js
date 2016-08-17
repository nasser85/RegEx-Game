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
    let levelStatus = null;

    //set up helper functions
    function randombomb(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max-min+min));
    }

    function createBombs (n) {
        let scope = this.game.scope;
        for (var i = 0; i < n; i++)
        {
            //  Create a bomb inside of the 'bombs' group
            bomb = bombs.create(randombomb(64, scope.gameConfig.width-64), 0, 'bomb');
            bomb.scale.setTo(.5,.5);
            bomb.stopFalling = randombomb(64, scope.gameConfig.height-64);
            //  Let gravity do its thing
            bomb.body.gravity.y = 300;
            //  This just gives each bomb a slightly random bounce value
            bomb.body.bounce.y = 0.4 + Math.random() * 0.2;
            bomb.question = scope.questions[scope.questionIndex];
            bomb.expirationTime = Date.now() + 1000;
            bomb.body.collideWorldBounds = true;
            bomb.explosion = this.game.add.sprite(bomb.position.x-32, bomb.position.y-32, 'explosion');
            bomb.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
            bombArr.push(bomb);
            if( scope.gameConfig.timeLimit <= bomb.expirationTime) scope.gameConfig.timeLimit = bomb.expirationTime;
            this.game.scope.incrementQuestionIndex();
        }
    }

    function collectbomb (player, bomb) {
        let scope = this.game.scope;
        scope.currentBomb = bomb;
        scope.$evalAsync();
        // Removes the bomb from the screen
        bomb.kill();
        var testArr = [{true: null, false: null}];
        //NEEDS TO BE FIXED
        scope.currentBomb.question.testCases.forEach(function(testCase){
            if(testCase.match){ // how does this test agains the input? no arg?
                if(testArr[testArr.length -1].true){ // if last el in testarr.true is truthy
                    testArr.push({true: testCase.content}) //push a new object onto the array.
                }else{
                    testArr[testArr.length -1].true = testCase.content; // make the existing object's true property equal to the content.
                }

            }else{ //it was wrong, add to the false prop similar to above.

                if(testArr[testArr.length -1].false){ //
                    testArr.push({false: testCase.content})
                }else{
                    testArr[testArr.length -1].false = testCase.content;
                }
            }
        })
        var startArr = testArr.filter(function(obj){
            return obj.true && obj.false; // filter for when both true and false are truthy??
        })
        var endArr = testArr.filter(function(obj){
            return !obj.true || !obj.false;
        })
        scope.testCaseArr = startArr.concat(endArr);


        //  Add and update the score
        score += scope.gameConfig.scoreIncrement;
        scoreText.text = 'Score: ' + score;
    }

//set up the actual game state
    RegexGame.Game = function(){};

    RegexGame.Game.prototype = {


      create: function() {
        let gameConfig = this.game.scope.gameConfig;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //  A simple background for our game
        this.add.sprite(0, 0, 'desert');
        // add the score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        bombs = this.add.group();
        bombs.enableBody = true;
        createBombs.call(this, gameConfig.numBombs);
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


      },
      update: function() {
        let gameConfig = this.game.scope.gameConfig;
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(bombs, platforms);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.arcade.overlap(player, bombs, collectbomb, null, this)


        // correctCount, bombsAlive, levelStatus updates/logic may need to change based on phaser modularization
        let correctCount = 0;
        let bombsAlive = false;
        bombArr.forEach(bomb => {
            if (bomb.alive) {
                if(bomb.correct) correctCount ++;
                bombsAlive = true;
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

        if(!bombsAlive){
            setTimeout(function(){levelStatus = 'lost'}.bind(this),gameConfig.levelTimePad);

        }
        if(correctCount > gameConfig.minCorrectAnswers && Date.now() >= gameConfig.timeLimit){
            levelStatus = 'won';
        }

        if(levelStatus) this.game.state.start('PostLevel', false, false, levelStatus);

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
