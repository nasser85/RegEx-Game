'use strict';

var Utils = require('./utils');

var arrWords = ['star', 'call', 'plane', 'boat', 'van', 'truck', 'grass', 'Fullstack', 'programmer', 'Node', 'Salamander', 'Regular', 'Expression', 'Regex', 'Start', 'Begin', 'opening', 'source', 'outset', 'countdown'];

var match_some = arrWords.map(function (word) {
  var randomIndex = Utils.randomIntInclusive(0, word.length - 1);
  var character = word[randomIndex];
  var leftStr = word.slice(0, randomIndex);
  var rightStr = word.slice(randomIndex + 1);
  var minOccurrences = Utils.randomIntInclusive(0, 1);
  var maxOccurrences = Utils.randomIntInclusive(2, 4);
  var testCases = [];
  for (var i = minOccurrences; i <= maxOccurrences; i++) {
    var str = leftStr + Utils.charString(i, character) + rightStr;
    testCases.push(Utils.testCase(str, true));
  }
  testCases[testCases.length - 1].match = false;

  return {
    text: 'Match some, but not all!',
    category: 'match_some',
    difficulty: 1,
    hint: '',
    answer: '',
    forceAnswer: false,
    testCases: testCases
  };
});

var arrRepeats = ['Repeat', 'Echo', 'Replay', 'Rerun', 'Re', 'Reproduce', 'Repetition', 'Reiteration', 'Hello', 'Duplicate'];
arrRepeats = arrRepeats.map(function (word) {
  var length = Utils.randomIntInclusive(3, 5);
  var testCases = [];
  for (var i = 1; i < length; i++) {
   var str = i === 1 ? word :  word.repeat(i);
   testCases.push(Utils.testCase(str, true));
  }
  str =  word.repeat(length + 1);
  testCases.push(Utils.testCase(str, false));

  return {
   text: 'Match some, but not all!',
   category: 'match_some',
   difficulty: 2,
   hint: '',
   answer: '',
   forceAnswer: false,
   testCases: testCases
  };
});

module.exports = {
  match_some: match_some,
  arrRepeats: arrRepeats
};
