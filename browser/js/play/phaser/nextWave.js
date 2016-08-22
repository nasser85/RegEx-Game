RegexGame.NextWave = function(){
  this.countDown=5000;
  this.countDownStart = null;
};

RegexGame.NextWave.prototype = {
  startNextWave: function(){
    //stop the emitter
    this.emitter.destroy();

    //start the next wave with random selection of battleA or battleB tunes
    let tune = Math.random() < .5 ? {track: 'battleA', length: 186} : {track: 'battleB', length: 116};
    this.game.state.start('Game', true, false, tune.track, tune.length);
  },
  init: function(){
    this.game.scope.currentWave++;
    this.game.scope.getNewQuestions();
  },
  create: function() {

    let background = this.game.add.tilemap('simpleCity_Layer1');
    background.addTilesetImage('streetTiles');
    let layer = background.createLayer(0);

    let music = this.add.audio('nextWave');
    music.addMarker('playNextWave',0, 6)
    music.play('playNextWave');


    this.emitter = new Emitter(this.game, 100, 0, 'bomb');

    let textStyle = { font: "20px gameFont", fill: "cyan", align: "center" };
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
