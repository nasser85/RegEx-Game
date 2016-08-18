RegexGame.GameOver = function(){
};

RegexGame.GameOver.prototype = {
  tryAgain: function(){
      this.game.scope.restartGame();
  },
  makeText: function(text, yoffset, style){
    let txt = this.game.add.text(this.game.width/2, this.game.height/2+yoffset, text, style);
    txt.anchor.set(0.5)
    return txt;
  },
  create: function() {
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    let style = { font: "30px Arial", fill: "#000", align: "center" };
    //message

    let text1 = this.makeText("GAME OVER :(",0,style);

    let text2 = this.makeText('You didn\'t diffuse the bombs in time biatch!',32,style);

    let text3 = this.makeText('Start Over?', 64, style);
    text3.inputEnabled = true;
    text3.events.onInputDown.add(this.tryAgain, this);

//    setTimeout(function(){this.game.state.start('Game')}.bind(this),2000)
  }
};
