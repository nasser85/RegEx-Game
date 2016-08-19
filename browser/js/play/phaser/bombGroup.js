var BombGroup = function (game, arrQuestions, image) {
  Phaser.Group.call(this, game);

  var bombRadius = 32; // after scaling & anchoring..

  var randomDataGenerator = new Phaser.RandomDataGenerator();
  for (var i = 0; i < arrQuestions.length; i++) {
    var x = randomDataGenerator.integerInRange(bombRadius, game.width - bombRadius);
    var sprite = this.create(x, 0 - bombRadius, image,0);
    sprite.scale.setTo(0.5, 0.5);
    sprite.anchor.setTo(0.5);
    sprite.heightToStopFalling = randomDataGenerator.integerInRange(bombRadius, game.height - bombRadius);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 300;
    sprite.question = arrQuestions[i];
    sprite.expirationTime = Date.now() + 30000 + 1000*(20*i);
    if(sprite.expirationTime > RegexGame.gameConfig.timeLimit) RegexGame.gameConfig.timeLimit = sprite.expirationTime;
    var bombTimer = new Timer(game, sprite);
    sprite.enableBody = true;
    sprite.body.collideWorldBounds = true;
  }
};

BombGroup.prototype = Object.create(Phaser.Group.prototype);
BombGroup.prototype.constructor = BombGroup;

BombGroup.prototype.transitionState = function(nextState){
  if(!this.transitioned){
    this.game.scope.currentBomb = null;
    setTimeout(function(){ this.game.state.start(nextState, false, false, levelStatus)}.bind(this), RegexGame.gameConfig.levelTimePad);
  }
  this.transitioned = true;
}

BombGroup.prototype.init = function(){
  this.transitioned = false;
}

BombGroup.prototype.update = function () {
  //things to check for each cycle
  let bombsAlive = false;
  let numDisarmed = 0; // will only check alive bombs. They only die if they expire.
  this.forEachAlive(function (bomb) {
    bombsAlive = true;
    if(bomb.question.disarmed) {
      bomb.frame = 1;
      numDisarmed++;
    } else if (bomb.expirationTime <= Date.now() && !bomb.question.disarmed) {
      var explosion = new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode');
      bomb.kill();
    }

    if (bomb.position.y >= bomb.heightToStopFalling) {
      bomb.body.moves = false;
    }
  }.bind(this))

// 0 question answered correctly before they expire, or time limit passed - you DUMBLOSER!
  if(!bombsAlive || Date.now() >= RegexGame.gameConfig.timeLimit) {
    this.transitionState('GameOver');
  }
// or you answered them all SMARTYPANTS
  else if(numDisarmed === this.children.length) {
    this.forEachAlive(bomb => bomb.kill())
    this.transitionState('NextWave');
  }

};

BombGroup.prototype.engage = function (player, bomb) {
  if(!bomb.question.disarmed){
    this.game.scope.currentBomb = bomb;
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
    this.game.scope.counter = Math.floor((this.game.scope.currentBomb.expirationTime - Date.now())/1000);
  
    this.game.scope.currentBomb.question.disarmed = false;
    this.game.scope.$evalAsync();
    var textBox = document.getElementById("text-answer");
   
   if (textBox) {
     textBox.focus();
   }
  }
};

  //  Add and update the score
/*  score += RegexGame.gameConfig.scoreIncrement;
  scoreText.text = 'Score: ' + score;
*/
