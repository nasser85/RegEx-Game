var Timer = function (game, associatedBomb) {

  Phaser.Text.call(this, game, 0, 0, '', { font: "14px Arial", fill: "#ff0000", align: "center" });

  this.associatedBomb = associatedBomb;

  this.anchor.set(0.5);

  game.add.existing(this);
};

Timer.prototype = Object.create(Phaser.Text.prototype);
Timer.prototype.constructor = Timer;

Timer.prototype.timeRemaining = function () {
  var millisecondsRemaining = this.associatedBomb.expirationTime - Date.now();
  var secondsRemaining = Math.floor(millisecondsRemaining / 1000);
  var minutes = Math.floor(secondsRemaining / 60);
  var seconds = secondsRemaining - 60 * minutes;
  var minutesString = '0' + String(minutes);
  var secondsString = '0' + String(seconds);
  return minutesString.slice(-2) + ':' + secondsString.slice(-2);
};


Timer.prototype.update = function () {
  if (this.associatedBomb.alive) {
    this.setText(this.timeRemaining());
    this.x = this.associatedBomb.x;
    this.y = this.associatedBomb.y - 30;
  } else {
    this.kill();
  }
};
