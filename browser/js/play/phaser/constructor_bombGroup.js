//creates bomb phaser group in the game. houses player+bomb collision logic

var BombGroup = function (game, arrQuestions, image) {
  //create phaser group
  Phaser.Group.call(this, game);

  var bombRadius = 32; // after scaling & anchoring..

  //create children of group
  for (var i = 0; i < arrQuestions.length; i++) {
    var x = _.random(bombRadius*3, game.width - bombRadius);
    var sprite = this.create(x, 0 - bombRadius, image,0);
    sprite.scale.setTo(0.5, 0.5);
    sprite.anchor.setTo(0.5);
    sprite.heightToStopFalling = _.random(200, game.height - bombRadius);

    //basic props for the child bomb
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 300;
    sprite.enableBody = true;
    sprite.body.collideWorldBounds = true;

    //add question data and set expiration time
    sprite.question = arrQuestions[i];
    sprite.expirationTime = Date.now() + RegexGame.gameConfig.minBombExpiration + (10000*i);

    //set wave total expiration time
    if(sprite.expirationTime > RegexGame.gameConfig.timeLimit) RegexGame.gameConfig.timeLimit = sprite.expirationTime;

    //create timer for new bomb
    var bombTimer = new Timer(game, sprite);
  }
};

BombGroup.prototype = Object.create(Phaser.Group.prototype);
BombGroup.prototype.constructor = BombGroup;

BombGroup.prototype.update = function () {

  this.forEachAlive(function (bomb) {
    // stop bombs from falling at their designated height
    if (bomb.position.y >= bomb.heightToStopFalling) {
      bomb.body.moves = false;
    }
    //check if bombs expire and blow them up
    if (bomb.expirationTime <= Date.now() && !bomb.question.disarmed) {
      this.game.scope.numExploded++;
      let explosion = new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode');
      explosion.destroy();
      bomb.kill();
    }
  }.bind(this))

};

BombGroup.prototype.engage = function (player, bomb) {

  this.game.scope.currentBomb = bomb;
  player.animations.stop();
  player.frame = 4;

  //manually separate bomb and player if phaser separation failed
  if(!player.body.touching.none){
    if(player.body.touching.right) {
      bomb.position.x += RegexGame.gameConfig.customPlayerBombSeparate;
    } else if (player.body.touching.left){
      bomb.position.x -= RegexGame.gameConfig.customPlayerBombSeparate;
    } else if (player.body.touching.up) {
      bomb.position.y -= RegexGame.gameConfig.customPlayerBombSeparate;
    } else if (player.body.touching.down){
      bomb.position.y += RegexGame.gameConfig.customPlayerBombSeparate;
    }
  }

  //enable display of test cases in bomb view
  if (this.game.scope.currentBomb.question.testCases) {
      var trueArr = [];
      var falseArr = [];
      var testArr = [];

      this.game.scope.currentBomb.question.testCases.forEach(function(testCase){
        if(testCase.match){
            trueArr.push(testCase.content);
        }else{
            falseArr.push(testCase.content);
        }
      });
        if (trueArr.length >= falseArr.length) {
            for (var i = 0; i < trueArr.length; i++) {
                testArr.push({true: trueArr[i], false: falseArr[i]});
            }
        } else {
            for (var j = 0; j < falseArr.length; j++) {
                testArr.push({true: trueArr[j], false: falseArr[j]});
            }
        }
      this.game.scope.testCaseArr = testArr;
  } else {
    this.game.scope.currentBomb.question.text = this.game.scope.currentBomb.question.subQuestions[this.game.scope.currentBomb.question.index];
  }

  //set up counter for bomb view
  this.game.scope.counter = Math.floor((this.game.scope.currentBomb.expirationTime - Date.now())/1000);

  //initialize disarmed prop on bomb. not sure we're actually using this anymore
  this.game.scope.currentBomb.question.disarmed = false;

  this.game.scope.$evalAsync();

};
