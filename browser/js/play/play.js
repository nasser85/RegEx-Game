app.config(function ($stateProvider) {
    $stateProvider.state('play', {
        url: '/play',
        templateUrl: 'js/play/play.html',
        controller: 'PlayCtrl',
        resolve: {
            questions : function(QuestionFactory){
                return QuestionFactory.fetchAll();
            },
            user : function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('PlayCtrl', function ($scope, questions, user, BombFactory) {
    $scope.questions = questions;
    // var randomIndex = Math.floor((Math.random() * questions.length));
    // $scope.currentQuestion = questions[randomIndex];
    // console.log($scope.currentQuestion);
    $scope.user = user;
    $scope.currentBomb = null;
    $scope.questionIndex = 0;
    $scope.answered = false;
    $scope.correct = true;
    $scope.testCaseArr = [];

    $scope.leave = function(){
        $scope.currentBomb = null;
        $scope.answered = false;
    }

    $scope.diffuse = function(answer, question){
        BombFactory.diffuse(answer, question)
        if (BombFactory.diffuse(answer, question)) {
            $scope.correct = true;
        } else {
            $scope.correct = false;
        }
        $scope.answered = true;
    }

    $scope.incrementQuestionIndex = function () {
        let newIndex = $scope.questionIndex + 1;
        newIndex === $scope.questions.length ? $scope.questionIndex = 0 :
            $scope.questionIndex = newIndex;
    };

    const gameConfig = {
      width: 800,
      height: 600,
      scoreIncrement: 10
    }
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
    let game = new Phaser.Game(gameConfig.width, gameConfig.height, Phaser.AUTO, 'playGame', { preload: preload, create: create, update: update });


    function randombomb(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max-min+min));
    }

    function preload() {
        game.load.image('desert', 'desert.png');
        game.load.spritesheet('dude', 'dude.png', 32, 48);
        game.load.spritesheet('bomb', 'bombs.png', 128, 128);
        game.load.spritesheet('explosion', 'explosion2.png', 128, 128);
        game.load.audio('bombExplode', 'time_bomb_short.mp3');
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
        $scope.testCaseArr = [];
        console.log('$scope.currentBomb', $scope.currentBomb)
        $scope.$evalAsync();
        // Removes the bomb from the screen
        bomb.kill();
        
        //NEEDS TO BE FIXED
        var falseArr = [];
        var trueArr = [];
        var testArr = [];
        $scope.currentBomb.question.testCases.forEach(function(testCase){
            if(testCase.match){
                trueArr.push(testCase.content);

            }else{
                falseArr.push(testCase.content);
            }
        })
        if (trueArr.length >= falseArr.length) {
            for (var i = 0; i < trueArr.length; i++) {
                testArr.push({true: trueArr[i], false: falseArr[i]});
            }
        } else {
            for (var j = 0; j < falseArr.length; j++) {
                testArr.push({true: trueArr[j], false: falseArr[j]});
            }
        }
        
        $scope.testCaseArr = testArr;
        console.log($scope.testCaseArr);


        //  Add and update the score
        score += gameConfig.scoreIncrement;
        scoreText.text = 'Score: ' + score;
    }

    function create() {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //  A simple background for our game
        game.add.sprite(0, 0, 'desert');
        // add the score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        bombs = game.add.group();
        bombs.enableBody = true;
        createBombs(5);
        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('down', [4, 3, 0, 1], 10, true);
        //add sound
        bombAudio = game.add.audio('bombExplode');
        bombAudio.allowMultiple = true;
        bombAudio.addMarker('playExplosionSound', 1, 3);


    }

    function update() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(bombs, platforms);
        cursors = game.input.keyboard.createCursorKeys();
        game.physics.arcade.overlap(player, bombs, collectbomb, null, this)

        bombArr.forEach(bomb => {
            if (bomb.alive) {
              if(bomb.position.y >= bomb.stopFalling) {
                bomb.body.velocity.y =0;
                bomb.body.gravity.y = 0;
              }
              if (bomb.expirationTime <= Date.now()) {
                bomb.explosion = game.add.sprite(bomb.position.x-32, bomb.position.y-32, 'explosion');
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
      }
})
