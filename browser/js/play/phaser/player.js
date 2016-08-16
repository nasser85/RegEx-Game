var Player = function (game, x, y, image) {

    Phaser.Sprite.call(this, game, x, y, image);

    game.physics.arcade.enable(this);

    this.body.bounce.y = 0;
    this.body.gravity.y = 0;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.animations.add('down', [4, 3, 0, 1], 10, true);

    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  // CURRENTLY RELIES ON 'cursors' BEING A GLOBAL VARIABLE

  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      this.body.velocity.x = -150;
      this.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      this.body.velocity.x = 150;
      this.animations.play('right');
  }
  //  Allow the this to jump if they are touching the ground.
  else if (cursors.up.isDown)
  {
      this.body.velocity.y = -100;
      this.animations.play('down');
  }


  else if (cursors.down.isDown)
  {
      this.body.velocity.y = 100;
      this.animations.play('down');
  }

  else
  {
      //  Stand still
      this.animations.stop();
      this.frame = 4;
  }
};
