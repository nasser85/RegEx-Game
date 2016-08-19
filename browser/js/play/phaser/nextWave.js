RegexGame.NextWave = function(){
  this.countDown=5000;
  this.countDownStart = null;
};

RegexGame.NextWave.prototype = {
  startNextWave: function(){
      this.emitter.destroy();
      this.game.state.start('Game', true, false);
  },
  init: function(){
    this.game.scope.currentWave++;
    this.game.scope.getNewQuestions();
  },
  create: function() {

    let background = this.game.add.tilemap('simpleCity_Layer1');
    background.addTilesetImage('streetTiles');
    let layer = background.createLayer(0);

    this.emitter = new Emitter(this.game, 100, 0, 'bomb');

    let textStyle = { font: "20px gameFont", fill: "#000", align: "center" };
    //message
    let text1 = `WAVE ${this.game.scope.currentWave-1} CLEARED! WAVE ${this.game.scope.currentWave} STARTS IN...`;
    let t1 = this.game.add.text(this.game.width/2, this.game.height/2, text1, textStyle);
    t1.anchor.set(0.5);


    this.t3 = this.game.add.text(this.game.width/2, this.game.height/2+100, this.countDown/1000, textStyle);
    this.t3.anchor.set(0.5);
    this.countDownStart = Date.now() + this.countDown;

  },
  update: function(){
    let countDown = this.countDownStart - Date.now()
    this.t3.text = Math.ceil(countDown/1000);
    if(countDown <= 0) this.startNextWave()
  }
};
