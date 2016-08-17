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
    sprite.expirationTime = Date.now() + 1000*(3 * i);
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
  this.game.scope.$evalAsync();
  bomb.kill();
};
/*
reference for what needs to be rebuilt to deal with state changes


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



*/



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

