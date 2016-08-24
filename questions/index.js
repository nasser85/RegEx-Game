'use strict';

var Utils = require('./utils');

var arrWords = ['star', 'call', 'plane', 'boat', 'van', 'truck', 'grass', 'Fullstack', 'programmer', 'Node', 'Salamander'];

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
  console.log(testCases);
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

module.exports = {
  match_some: match_some
};


