var BombGroup = function (game, arrQuestions, image) {
  Phaser.Group.call(this, game);

  var bombRadius = 32; // after scaling & anchoring..

  for (var i = 0; i < arrQuestions.length; i++) {
    var x = _.random(bombRadius*2, game.width - bombRadius);
    var sprite = this.create(x, 0 - bombRadius, image,0);
    sprite.scale.setTo(0.5, 0.5);
    sprite.anchor.setTo(0.5);
    sprite.heightToStopFalling = _.random(200, game.height - bombRadius);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 300;
    sprite.question = arrQuestions[i];

     // sprite.expirationTime = Date.now() + RegexGame.gameConfig.minBombExpiration + (10000*i);
    sprite.expirationTime = Date.now() + 1000*(i+4);

    if(sprite.expirationTime > RegexGame.gameConfig.timeLimit) RegexGame.gameConfig.timeLimit = sprite.expirationTime;
    var bombTimer = new Timer(game, sprite);
    sprite.enableBody = true;
    sprite.body.collideWorldBounds = true;
  }
};

BombGroup.prototype = Object.create(Phaser.Group.prototype);
BombGroup.prototype.constructor = BombGroup;

BombGroup.prototype.update = function () {
  this.forEachAlive(function (bomb) {
    if (bomb.expirationTime <= Date.now() && !bomb.question.disarmed) {
      this.game.scope.numExploded++;
      let explosion = new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode');
      explosion.destroy();
      bomb.kill();
    }
    if (bomb.position.y >= bomb.heightToStopFalling) {
      bomb.body.moves = false;
    }
  }.bind(this))

};

BombGroup.prototype.freeze = function (bomb){
  bomb.body.moves = false;
}

BombGroup.prototype.engage = function (player, bomb) {
  player.canMove = false;
  player.animations.stop();
  player.frame = 4;
  if(!bomb.question.disarmed){
    this.game.scope.currentBomb = bomb;

    if (this.game.scope.currentBomb.question.testCases) {
          var trueArr = [];
        var falseArr = [];
        var testArr = [];

        //NEEDS TO BE FIXED

        this.game.scope.currentBomb.question.testCases.forEach(function(testCase){
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
        this.game.scope.testCaseArr = testArr;
    } else {
      this.game.scope.currentBomb.question.text = this.game.scope.currentBomb.question.subQuestions[this.game.scope.currentBomb.question.index];
    }

    this.game.scope.counter = Math.floor((this.game.scope.currentBomb.expirationTime - Date.now())/1000);

    var textBox = document.getElementById("text-answer");
   
   if (textBox) {
     textBox.focus();
   }
    this.game.scope.currentBomb.question.disarmed = false;
    this.game.scope.$evalAsync();

  }
};
