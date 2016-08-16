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
      bomb.kill();
      console.log('boom', bomb.question);
    }
  })
};

// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

// var customGroup1;
// var customGroup2;

// function preload() {

//     game.load.image('ufo', 'assets/sprites/ufo.png');
//     game.load.image('baddie', 'assets/sprites/space-baddie.png');

// }

// function create() {

//     customGroup1 = new BombGroup(game, 'ufo', 'bounce');
//     customGroup2 = new BombGroup(game, 'baddie', 'slide');

// }
