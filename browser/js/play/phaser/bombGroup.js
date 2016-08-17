var BombGroup = function (game, arrQuestions, image) {

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
    sprite.expirationTime = Date.now() + 1000*(3 * i);
    var bombTimer = new Timer(game, sprite);
    sprite.enableBody = true;
    sprite.body.collideWorldBounds = true;
  }
};

BombGroup.prototype = Object.create(Phaser.Group.prototype);
BombGroup.prototype.constructor = BombGroup;

BombGroup.prototype.update = function () {
  this.forEachAlive(function (bomb) {
    if (bomb.position.y >= bomb.heightToStopFalling) {
      bomb.body.velocity.y = 0;
      bomb.body.gravity.y = 0;
    }

    if (bomb.expirationTime <= Date.now()) {
      var explosion = new Explosion(RegexGame.game, bomb.x, bomb.y, 'explosion', 'bombExplode');
      bomb.kill();
    }
  })
};

BombGroup.prototype.engage = function (player, bomb) {
  this.game.scope.currentBomb = bomb;
  this.game.scope.$evalAsync();
  bomb.kill();

  // var testArr = [{true: null, false: null}];
  // NEEDS TO BE FIXED
  // this.game.scope.currentBomb.question.testCases.forEach(function(testCase){
  //     if(testCase.match){ // how does this test agains the input? no arg?
  //         if(testArr[testArr.length -1].true){ // if last el in testarr.true is truthy
  //             testArr.push({true: testCase.content}) //push a new object onto the array.
  //         }else{
  //             testArr[testArr.length -1].true = testCase.content; // make the existing object's true property equal to the content.
  //         }

  //     }else{ //it was wrong, add to the false prop similar to above.

  //         if(testArr[testArr.length -1].false){ //
  //             testArr.push({false: testCase.content})
  //         }else{
  //             testArr[testArr.length -1].false = testCase.content;
  //         }
  //     }
  // })
  // var startArr = testArr.filter(function(obj){
  //     return obj.true && obj.false; // filter for when both true and false are truthy??
  // })
  // var endArr = testArr.filter(function(obj){
  //     return !obj.true || !obj.false;
  // })
  // this.game.scope.testCaseArr = startArr.concat(endArr);


  // //  Add and update the score
  // score += this.game.scope.gameConfig.scoreIncrement;
  // scoreText.text = 'Score: ' + score;
};
