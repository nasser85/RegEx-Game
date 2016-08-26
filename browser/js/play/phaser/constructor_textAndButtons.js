//hard to use constructor for Menu and Game Over button/text
var TextOrButton = function(buttonOrText, game,  textX, textY, copy, buttonYOffset, clickMethod, clickContext, textBoundYOffset){

  let text;
  let button;

  switch (buttonOrText) {
    case 'button':
      text = game.add.text(textX, textY, copy, RegexGame.gameConfig.buttonTextStyle);
      button = game.add.button(game.width/2-75, game.height/2-buttonYOffset, 'gamebuttons', clickMethod, clickContext);
      button.addChild(text);
      button.setFrames(1,0);
      break;

    case 'text':
      text = game.add.text(textX, textY, copy,RegexGame.gameConfig.textStyle);
      text.setTextBounds(0, game.height-textBoundYOffset, 800, 100)
      break;
  }

}
