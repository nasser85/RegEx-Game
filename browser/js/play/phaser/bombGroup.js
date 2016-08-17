var BombGroup = function (game, arrQuestions, image) {

  this.numCorrect = 0;

  Phaser.Group.call(this, game);

  var bombRadius = 32; // after scaling & anchoring..

  var randomDataGenerator = new Phaser.RandomDataGenerator();

  for (var i = 0; i < arrQuestions.length; i++) {
    var x = randomDataGenerator.integerInRange(bombRadius, game.width - bombRadius);
    var sprite = this.create(x, 0 - bombRadius, image);
    sprite.scale.setTo(0.5, 0.5);
    sprite.anchor.setTo(0.5);
    sprite.heightToStopFalling = randomDataGenerator.integerInRange(bombRadius, game.height - bombRadius);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 300;
    sprite.question = arrQuestions[i];
    sprite.expirationTime = Date.now() + 1000*(300 * i);
    if(sprite.expirationTime > RegexGame.gameConfig.timeLimit) RegexGame.gameConfig.timeLimit = sprite.expirationTime;
    var bombTimer = new Timer(game, sprite);
    sprite.enableBody = true;
    sprite.body.collideWorldBounds = true;
  }
};

BombGroup.prototype = Object.create(Phaser.Group.prototype);
BombGroup.prototype.constructor = BombGroup;

BombGroup.prototype.updateNumCorrect = function(){
  this.numCorrect++;
}

BombGroup.prototype.update = function () {
  let bombsAlive = false;
  this.forEachAlive(function (bomb) {
    bombsAlive = true;
    if (bomb.correct) this.updateNumCorrect; //
    if (bomb.position.y >= bomb.heightToStopFalling) {
      bomb.body.velocity.y = 0;
      bomb.body.gravity.y = 0;
    }

    if (bomb.expirationTime <= Date.now()) {
      var explosion = new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode');
      bomb.kill();
    }
  }.bind(this))

// 0 question answered correctly before they expire.
  if(!bombsAlive){
        setTimeout(function(){levelStatus = 'lost'}.bind(this), RegexGame.gameConfig.levelTimePad);
  }

  // all questions answeredd correctly before timelimit.

  // answer minimum bombs correctly before timelimit- compare minCorrectAnswers vs. timeLimit

  // answer less than min bombs correctly before timelimit - compare minCorrectAnswers

  if(levelStatus) this.game.state.start('PostLevel', false, false, levelStatus);

};

BombGroup.prototype.engage = function (player, bomb) {
  this.game.scope.currentBomb = bomb;
  console.log(this.game.scope);
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

  this.game.scope.$evalAsync();
  //bomb.kill();
};

  //  Add and update the score
/*  score += RegexGame.gameConfig.scoreIncrement;
  scoreText.text = 'Score: ' + score;
*/
