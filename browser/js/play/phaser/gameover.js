RegexGame.GameOver = function(){
};

RegexGame.GameOver.prototype = {
  tryAgain: function(){
      this.game.state.start('Game');
  },
  create: function() {
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    let style = { font: "30px Arial", fill: "#000", align: "center" };
    //message
    let text1 = "GAME OVER :(";
    let t1 = this.game.add.text(this.game.width/2, this.game.height/2, text1, style);
    t1.anchor.set(0.5);

    let text2 = 'Start Over?';
    let t2 = this.game.add.text(this.game.width/2, this.game.height/2+32, text2, style);
    t2.anchor.set(0.5);
    t2.inputEnabled = true;
    t2.events.onInputDown.add(this.tryAgain, this);

//    setTimeout(function(){this.game.state.start('Game')}.bind(this),2000)
  }
};
