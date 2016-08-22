RegexGame.GameOver = function(){
};

RegexGame.GameOver.prototype = {
  tryAgain: function(){
      this.game.scope.restartGame();
  },
  saveScore: function(){
      this.game.scope.saveScore = true;  
      console.log('saveScore', this.game.scope.saveScore );
      this.game.scope.$evalAsync();
  },
  makeText: function(text, yoffset, style){
    let txt = this.game.add.text(this.game.width/2, this.game.height/3+yoffset, text, style);
    txt.anchor.set(0.5)
    return txt;
  },
  create: function() {
   //show the space tile, repeated
    let background = this.game.add.tilemap('simpleCity_Layer1');
    background.addTilesetImage('streetTiles');
    let layer = background.createLayer(0);

    let style = { font: "20px gameFont", fill: "cyan", align: "center" };
    //message

    let text1 = this.makeText("GAME OVER :(",0,{ font: "30px gameFont", fill: "cyan", align: "center" });

    let text2 = this.makeText('You didn\'t diffuse the bombs in time!',60,style);

    let text3 = this.makeText('Start Over?', 100, style);
    text3.inputEnabled = true;
    text3.events.onInputDown.add(this.tryAgain, this);

        //return to main menu
    let text4 = this.makeText('Return to Main Menu', 120, style);
    text4.inputEnabled = true;
    text4.events.onInputDown.add(this.game.scope.goHome, this);


    let text5 = this.makeText('Save Your Score', 140, style);
    text5.inputEnabled = true;
    text5.events.onInputDown.add(this.saveScore, this);
//    setTimeout(function(){this.game.state.start('Game')}.bind(this),2000)
  }
};
