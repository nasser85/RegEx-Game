//constructor for player object
var Player = function (game, x, y, image) {
    Phaser.Sprite.call(this, game, x, 0, image);

    //add to game with physics
    game.add.existing(this);
    game.physics.arcade.enable(this);

    //basic props
    this.stoppingY = y;
    this.anchor.set(0.5);
    this.body.bounce.y = 0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;
    this.stoppedFalling = false;

    //define frames from sprite for animations
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.animations.add('down', [4, 4, 4, 4], 10, true);
    this.animations.add('up', [9, 9, 9, 9], 10, true);


};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  // CURRENTLY RELIES ON 'cursors' BEING A GLOBAL VARIABLE

  //stop dude from falling at specified y
  if(!this.stoppedFalling){
    if(this.position.y >= this.stoppingY){
      this.body.gravity.y = 0
      this.body.velocity.y = 0
      this.stoppedFalling = true;
    }
  }
  // ensure dude isn't moving unless you press a cursor
  else{
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (cursors.left.isDown) {
      this.body.velocity.x = -300;
      this.animations.play('left');

    } else if (cursors.right.isDown) {

      this.body.velocity.x = 300;
      this.animations.play('right');

    } else if (cursors.up.isDown) {

      this.body.velocity.y = -300;
      this.animations.play('up');

    } else if (cursors.down.isDown) {

      this.body.velocity.y = 300;
      this.animations.play('down');

    } else {
      this.animations.stop();
      this.frame = 4;
      }

    }

};

module.exports = Player;
