RegexGame.GameOver = function(){
};

RegexGame.GameOver.prototype = {
  tryAgain: function(){
      this.game.state.start('Game');
  },
  saveScore: function(){
      this.game.scope.saveScore = true;
      // this.game.scope.score = 1234567;//to be removed.
  },
  makeText: function(text, yoffset, style){
    let txt = this.game.add.text(this.game.width/2, this.game.height/3+yoffset, text, style);
    txt.anchor.set(0.5)
    return txt;
  },
  create: function() {
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    let style = { font: "20px gameFont", fill: "#000", align: "center" };
    //message

    let text1 = this.makeText("GAME OVER :(",0,{ font: "30px gameFont", fill: "#000", align: "center" });

    let text2 = this.makeText('You didn\'t diffuse the bombs in time!',60,style);

    let text3 = this.makeText('Start Over?', 100, style);
    text3.inputEnabled = true;
    text3.events.onInputDown.add(this.tryAgain, this);

    let text4 = this.makeText('Save Your Score', 140, style);
    text4.inputEnabled = true;
    text4.events.onInputDown.add(this.saveScore, this);
//    setTimeout(function(){this.game.state.start('Game')}.bind(this),2000)
  }
};
