'use strict';

app.factory('GeneratedQuestion', function (CharacterCodeFactory, Utils) {
  var Codes = CharacterCodeFactory;

  function Question () {
    this.subQuestions = [];
    this.index = 0;
    this.text = null;
    this.match = [];
    this.doNotMatch = [];
    this.type = 'Generated';
  }

  Object.defineProperty(Question.prototype, 'lastIndex', { get: function () {
    return this.subQuestions.length - 1;
  }});

  Question.prototype.generate = function (text, arrAllCharCodes, subsetArrCharCodes) {
    var difference = Utils.difference(arrAllCharCodes, subsetArrCharCodes);

    this.subQuestions.push(text);
    this.match.push(Utils.arrayOfCharacters(subsetArrCharCodes));
    this.doNotMatch.push(Utils.stringOfCharacters(difference));

    return this;
  };

  Question.prototype.evenDigit = function () {
    return this.generate('Every even digit', Codes.allCharacters, Codes.evenDigits);
  };

  Question.prototype.oddDigit = function () {
    return this.generate('Every odd digit', Codes.allCharacters, Codes.oddDigits);
  };

  Question.prototype.anyDigit = function () {
    return this.generate('Every digit', Codes.allCharacters, Codes.allDigits);
  };

  Question.prototype.anyNonDigit = function () {
    var text = 'Every character that is not a digit';

    return this.generate(text, Codes.allCharacters, Utils.difference(Codes.allCharacters, Codes.allDigits));
  };

  Question.prototype.digitWithinRange = function () {
    var lower = Utils.firstElement(Codes.allDigits);
    var upper = Utils.lastElement(Codes.allDigits);
    var range = Utils.randomRange(lower, upper, 3, 8);

    var text = `A digit in the range of ${Utils.fromCodePoint(range[0])} to ${Utils.fromCodePoint(range[range.length - 1])}`;

    return this.generate(text, Codes.allCharacters, range);
  };

  Question.prototype.lowercaseLetterWithinRange = function () {
    var lower = Utils.firstElement(Codes.lowercaseLetters);
    var upper = Utils.lastElement(Codes.lowercaseLetters);
    var range = Utils.randomRange(lower, upper, 3, 20);

    var text = `A letter in the range of ${Utils.fromCodePoint(range[0])} to ${Utils.fromCodePoint(range[range.length - 1])}`;

    return this.generate(text, Codes.allCharacters, range);
  };

  Question.prototype.uppercaseLetterWithinRange = function () {
    var lower = Utils.firstElement(Codes.uppercaseLetters);
    var upper = Utils.lastElement(Codes.uppercaseLetters);
    var range = Utils.randomRange(lower, upper, 3, 20);

    var text = `A letter in the range of ${Utils.fromCodePoint(range[0])} to ${Utils.fromCodePoint(range[range.length - 1])}`;

    return this.generate(text, Codes.allCharacters, range);
  };

  Question.prototype.anyWhitespace = function () {
    return this.generate('Every whitespace character', Codes.allCharacters, Codes.whitespace);
  };

  Question.prototype.anyNonWhitespace = function () {
    var text = 'Every character that is not whitespace';

    return this.generate(text, Codes.allCharacters, Utils.difference(Codes.allCharacters, Codes.whitespace));
  };

  return Question;
});
