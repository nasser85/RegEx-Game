RegexGame.MainMenu = function(){};

RegexGame.MainMenu.prototype = {
  create: function() {

    //play the menu bumper
    let music = this.add.audio('menuBumper');
    music.addMarker('playMenuBumper',0,6)
    music.play('playMenuBumper');
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    let textStyle = { font: "30px Arial", fill: "#000", align: "center" };

    //start game text
    let text1 = "LEVEL 1 >";
    let t1 = this.game.add.text(this.game.width/2, this.game.height/2, text1, textStyle);
    t1.anchor.set(0.5);

    let text2 = "LEVEL 2 >";
    let t2 = this.game.add.text(this.game.width/2, this.game.height/2+50, text2, textStyle);
    t2.anchor.set(0.5);

    //highest score
    let text3 = "Highest score: "+this.highestScore;
    let t3 = this.game.add.text(this.game.width/2, this.game.height/2 + 100, text3, textStyle);
    t3.anchor.set(0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
