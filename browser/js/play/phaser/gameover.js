RegexGame.GameOver = function(){
};

RegexGame.GameOver.prototype = {
  tryAgain: function(){
      this.game.scope.restartGame();
  },
  saveScore: function(){
      this.game.scope.saveScore = true;
      this.game.scope.saveToDatabase(this.game.scope.score, this.game.scope.user.id);
      this.game.scope.$evalAsync();
  },
  makeText: function(text, style){
    let txt = this.game.add.text(this.game.width/2, this.game.height/2+yoffset, text, style);
    txt.anchor.set(0.5)
    return txt;
  },
  init: function(){
      //tee up groan track
      this.groan = this.add.audio('groan');
      this.groan.addMarker('playGroan',0,2);
      this.game.scope.saveToDatabase(this.game.scope.score, this.game.scope.user.id);
    },
  create: function() {
    //set up background
    let background = this.game.add.tilemap('simpleCity_Layer1');
    background.addTilesetImage('streetTiles');
    background.createLayer(0);

    //play audio
    this.groan.play('playGroan');
    //create buttons and text
    this.game.add.image(0,0, 'dudeLogo')

    let gameOverText = new TextOrButton('text', this.game, 0, 0, 'GAME OVER :(', null, null, null, 500);

    let outOfTimeText = new TextOrButton('text', this.game, 0,0, 'You didn\'t defuse the bombs in time!', null, null, null, 250)

    let restartButton = new TextOrButton('button', this.game, 10, 10, 'Game Menu', 100, this.tryAgain, this)

        //return to main menu
    let mainMenuButton = new TextOrButton('button', this.game, 10, 10, 'Main Menu', 50, this.goHome, this);

    let saveScoreButton = new TextOrButton('button', this.game, 2, 10, 'Save Score', 0, this.saveScore, this);

  }
};
