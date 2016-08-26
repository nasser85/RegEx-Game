//hard to use constructor for Game and Main Menu button/text
var TextOrButton = function(buttonOrText, game,  textX, textY, copy, buttonYOffset, clickMethod, clickContext, textBoundYOffset){
  let textA;
  let buttonA;

  //creates approprite element based on buttonOrText parameter
  switch (buttonOrText) {
    case 'button':
      textA = game.add.text(textX, textY, copy, RegexGame.gameConfig.buttonTextStyle);
      buttonA = game.add.button(game.width/2-75, game.height/2-buttonYOffset, 'gamebuttons', clickMethod, clickContext);
      buttonA.addChild(textA);
      buttonA.setFrames(1,0);
      break;
    case 'text':
        textA = game.add.text(textX, textY, copy,RegexGame.gameConfig.textStyle);
      textA.setTextBounds(0, game.height-textBoundYOffset, 800, 100)
      break;
  }

}
