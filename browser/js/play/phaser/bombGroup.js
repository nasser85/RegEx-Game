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
    sprite.expirationTime = Date.now() + 1000*(3*i);
    if(sprite.expirationTime > RegexGame.gameConfig.timeLimit) RegexGame.gameConfig.timeLimit = sprite.expirationTime;
    var bombTimer = new Timer(game, sprite);
    sprite.enableBody = true;
    sprite.body.collideWorldBounds = true;
  }
};

BombGroup.prototype = Object.create(Phaser.Group.prototype);
BombGroup.prototype.constructor = BombGroup;

BombGroup.prototype.transitionState = function(nextState){

  setTimeout(function(){ this.game.state.start(nextState, false, false, levelStatus)}.bind(this), RegexGame.gameConfig.levelTimePad);

}

BombGroup.prototype.update = function () {
  //things to check for each cycle
  let bombsAlive = false;
  let numDisarmed = 0; // will only check alive bombs. They only die if they expire.

  this.forEachAlive(function (bomb) {
    bombsAlive = true;
    if(bomb.question.disarmed) numDisarmed++;
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

// 0 question answered correctly before they expire, or time limit passed - you DUMBLOSER!
  if(!bombsAlive || Date.now() >= RegexGame.gameConfig.timeLimit) this.transitionState('GameOver');
// or you answered them all SMARTYPANTS
  else if(numDisarmed === this.children.length-1) this.transitionState('NextWave');

};

BombGroup.prototype.engage = function (player, bomb) {
  this.game.scope.currentBomb = bomb;

  var testArr = [{true: null, false: null}];

  this.game.scope.currentBomb.question.testCases.forEach(function(testCase){
      if(testCase.match){
          if(testArr[testArr.length -1].true){
              testArr.push({true: testCase.content})
          }else{
              testArr[testArr.length -1].true = testCase.content;
          }

      }else{

          if(testArr[testArr.length -1].false){
              testArr.push({false: testCase.content})
          }else{
              testArr[testArr.length -1].false = testCase.content;
          }
      }
  })
  var startArr = testArr.filter(function(obj){
      return obj.true && obj.false;
  })
  var endArr = testArr.filter(function(obj){
      return !obj.true || !obj.false;
  })
  this.game.scope.testCaseArr = startArr.concat(endArr);

  this.game.scope.$evalAsync();
};

  //  Add and update the score
/*  score += RegexGame.gameConfig.scoreIncrement;
  scoreText.text = 'Score: ' + score;
*/
