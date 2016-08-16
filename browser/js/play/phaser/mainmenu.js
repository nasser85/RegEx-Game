RegexGame.MainMenu = function(){};

RegexGame.MainMenu.prototype = {
  create: function() {
    //play the menu bumper
    var music = this.add.audio('menuBumper');
    music.addMarker('playMenuBumper',0,6)
    music.play('playMenuBumper');
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    //start game text
    var text = "LEVEL 1 >";
    var style = { font: "30px Arial", fill: "#000", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    var text = "LEVEL 2 >";
    var style = { font: "30px Arial", fill: "#000", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2+50, text, style);
    t.anchor.set(0.5);

    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Arial", fill: "#000", align: "center" };

    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 100, text, style);
    h.anchor.set(0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
