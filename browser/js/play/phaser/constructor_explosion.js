var Explosion = function (game, x, y, image, sound) {

  Phaser.Sprite.call(this, game, x, y, image);

  this.anchor.setTo(0.5);
  game.add.existing(this);

  this.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
  this.animations.play('explode');

  this.audio = game.add.audio(sound);
  this.audio.allowMultiple = true;
  this.audio.addMarker('playExplosionSound', 1, 3, RegexGame.gameConfig.audioVolume);
  this.audio.play('playExplosionSound');
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function () {};

module.exports = Explosion;
