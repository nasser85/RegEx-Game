RegexGame.PostLevel = function(){};

RegexGame.PostLevel.prototype = {
  init: function(levelStatus) {
    this.levelStatus = levelStatus;
   },
  create: function() {
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    //message
    let text = levelStatus === 'won' ? "LEVEL COMPLETE!" : "LEVEL FAILED :(";
    let style = { font: "30px Arial", fill: "#000", align: "center" };
    let t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    setTimeout(function(){this.game.state.start('MainMenu')}.bind(this),2000)
  }/*,
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }*/
};
