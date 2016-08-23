var Player = function (game, x, y, image) {
    this.stoppingY = y;
    this.canMove = true;
    Phaser.Sprite.call(this, game, x, 0, image);
    game.add.existing(this);

    this.anchor.set(0.5);

    game.physics.arcade.enable(this);
    this.body.bounce.y = 0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.animations.add('down', [4, 4, 4, 4], 10, true);
    this.animations.add('up', [9, 9, 9, 9], 10, true);
    this.stoppedFalling = false;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // CURRENTLY RELIES ON 'cursors' BEING A GLOBAL VARIABLE
  if(!this.stoppedFalling){
    if(this.position.y >= this.stoppingY){
      this.body.gravity.y = 0
      this.body.velocity.y = 0
      this.stoppedFalling = true;
    }
  }
  else{
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if(this.canMove){
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
    }

};
