'use strict';

app.factory('GeneratedQuestion', function (CharacterCodeFactory, Utils) {
  var Codes = CharacterCodeFactory;

  function Question () {
    this.text = [];
    this.match = [];
    this.doNotMatch = [];
  }

  Object.defineProperty(Question.prototype, 'lastIndex', { get: function () {
    return this.text.length - 1;
  }});

  Question.prototype.generate = function (text, arrAllCharCodes, subsetArrCharCodes) {
    var difference = Utils.difference(arrAllCharCodes, subsetArrCharCodes);

    this.text.push(text);
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
    var range = Utils.randomRange(48, 57, 3, 8);

    var text = `A digit in the range of ${Utils.fromCodePoint(range[0])} to ${Utils.fromCodePoint(range[range.length - 1])}`;

    return this.generate(text, Codes.allCharacters, range);
  };

  function checkAnswer (re, q) {
    console.log(q);
    var matchTest = q.match[0].every(function (element) {
      return re.test(element);
    });
    var dontMatchTest = re.test(q.doNotMatch[0])

    console.log(matchTest, 'matchTest');
    console.log(dontMatchTest, 'dontMatchTest');
    return matchTest && !dontMatchTest ? 'you got it right' : 'incorrect';
  }

  // console.log(checkAnswer(/\d/, q));

  return Question;
});
