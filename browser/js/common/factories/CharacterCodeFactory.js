'use strict';

app.factory('CharacterCodeFactory', function (Utils) {

  var whiteSpace = [9, 10, 11, 12, 13, 32];
  var allCharacters = Utils.range(32, 127).concat(whiteSpace);

  var evenDigits = [48, 50, 52, 54, 56];
  var oddDigits = [49, 51, 53, 55, 57];
  var allDigits = evenDigits.concat(oddDigits);

  var capitalLetters = Utils.range(65, 90);
  var lowercaseLetters = Utils.range(97, 122);
  var symbols = Utils.range(33, 47)
                .concat(Utils.range(58, 64))
                .concat(Utils.range(91, 96))
                .concat(Utils.range(123, 126));

  return {
    whiteSpace: whiteSpace,
    allCharacters: allCharacters,
    evenDigits: evenDigits,
    oddDigits: oddDigits,
    allDigits: allDigits,
    capitalLetters: capitalLetters,
    lowercaseLetters: lowercaseLetters,
    symbols: symbols
  };
});
