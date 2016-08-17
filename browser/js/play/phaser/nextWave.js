RegexGame.NextWave = function(){
  this.countDown=5000;
  this.countDownStart = null;
};

RegexGame.NextWave.prototype = {
  startNextWave: function(){
      this.game.state.start('Game');
  },
  create: function() {
   //show the space tile, repeated
    this.background = this.game.add.sprite(0, 0, 'desert');

    let style = { font: "30px Arial", fill: "#000", align: "center" };
    //message
    let text1 = "WAVE CLEARED! NEXT ONE STARTS IN...";
    let t1 = this.game.add.text(this.game.width/2, this.game.height/2, text1, style);
    t1.anchor.set(0.5);

    let text2 = '3';
    let t2 = this.game.add.text(this.game.width/2, this.game.height/2+32, this.coundDown/1000, style);
    t2.anchor.set(0.5);

    this.t3 = this.game.add.text(this.game.width/2, this.game.height/2+200, this.countDown/1000, textStyle);
    this.t3.anchor.set(0.5);
    this.countDownStart = Date.now() + this.countDown;

  },
  update: function(){
    let countDown = this.countDownStart - Date.now()
    this.t3.text = Math.ceil(countDown/1000);
    if(countDown <= 0) this.start()
  }
};
