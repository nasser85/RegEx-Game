[![Stories in Ready](https://badge.waffle.io/nasser85/RegEx-Game.png?label=ready&title=Ready)](https://waffle.io/nasser85/RegEx-Game)
# RegEx Race
* Watch [this presentation](https://www.youtube.com/watch?v=jUGu1AIZCOY&feature=youtu.be) to learn more about how RegEx Race was created.

## Overview
This is an second draft of a game to practice RegEx, and will have two main components:
* Play Game
* My Account (not active yet)

### Play Game
This is an Angular state that uses a mix of Phaser.io and Angular directives to create the game experience. Phaser.io is used for the main levels and map, and a directive will be used for the bomb defuse view.

Gameplay will be waves of bombs dropping with increasing levels of difficulty.

### My Account (does not exist yet)
For registered users, you will be able to see
* Your previous answers to questions
* See other answers to the same questions from other users.

### Major updates since first review:
* Enhanced bomb diffuse view, including
** Timer
** Improved CSS
* Massive modularization of Phaser and Angular code
* Nearly complete scaffolding for supporting inifinite waves of bombs (until we run out of questions) both on front and back end (ability to ask DB for next wave of questions and attach them to the DOM)

