//hard to use constructor for Menu and Game Over button/text
//in the future, make this a group with children text or buttons, so they can be made and destroyed more easily

var TextOrButton = function(buttonOrText, game,  textX, textY, copy, buttonYOffset, clickMethod, clickContext, textBoundYOffset){
  this.text;
  this.button;

  switch (buttonOrText) {
    case 'button':
      this.text = game.add.text(textX, textY, copy, RegexGame.gameConfig.buttonTextStyle);
      this.button = game.add.button(game.width/2-75, game.height/2-buttonYOffset, 'gamebuttons', clickMethod, clickContext);
      this.button.addChild(this.text);
      this.button.setFrames(1,0);
      break;

    case 'text':
      this.text = game.add.text(textX, textY, copy,RegexGame.gameConfig.textStyle);
      this.text.setTextBounds(0, game.height-textBoundYOffset, 800, 100)
      break;
  }

}
