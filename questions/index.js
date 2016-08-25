'use strict';

var _ = require('lodash');
var TestCase = require('./testcase');
var MatchSomeButNotAll = require('./MatchSomeButNotAll');
var Utils = require('./utils');

var arrWords = ['Fullstack', 'programmer', 'Node', 'Salamander', 'Regular', 'Expression', 'Regex', 'Start', 'Begin', 'opening', 'source', 'outset', 'countdown'];

arrWords = arrWords.map(function (word) {
  var index = Utils.randomIntInclusive(0, word.length - 1);
  var char = word.charAt(index);
  var leftStr = word.slice(0, index);
  var rightStr = word.slice(index + 1);
  var minOccurrences = Utils.randomIntInclusive(0, 1);
  var maxOccurrences = Utils.randomIntInclusive(2, 4);

  var testCases = [];
  for (var i = minOccurrences; i <= maxOccurrences; i++) {
    let str = leftStr + Utils.charString(i, char) + rightStr;
    let bool = i < maxOccurrences;
    testCases.push(new TestCase(str, bool));
  }

  return new MatchSomeButNotAll(testCases, 1);
});

var arrRepeats = ['Repeat', 'Echo', 'Replay', 'Rerun', 'Re', 'Reproduce', 'Repetition', 'Reiteration', 'Hello', 'Duplicate'];

arrRepeats = arrRepeats.map(function (word) {
  var num = Utils.randomIntInclusive(3, 4);
  var testCases = [];
  for (var i = 1; i <= num; i++) {
    let bool = i < num;
    testCases.push(new TestCase(word.repeat(i), bool));
  }

  return new MatchSomeButNotAll(testCases, 1);
});

var arrNames = ['Bob', 'Sally', 'Bessie', 'John', 'Sam', 'Jay', 'Sean', 'Jason', 'Paul', 'Lenny', 'Zeke', 'Seamus', 'Dave', 'Orion', 'Debbie', 'Kevin', 'Kent', 'Hollister', 'Omri', 'Reed']

arrNames = arrNames.map(function (word) {
  var index = Utils.randomIntInclusive(1, word.length - 2);
  var symbol = Utils.randomFromArr(['$', '$', '=', '<', '>', '%', '.', '.']);
  var number = Utils.randomFromArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  var arr = _.shuffle([symbol, number, ' ']);
  var testCases = [];
  arr.forEach(function (e, i) {
    let str = Utils.stringSplice(word, index, e);
    let bool = i < arr.length - 1;
    testCases.push(new TestCase(str, bool));
  });
  testCases.push(new TestCase(word, false));

  return new MatchSomeButNotAll(testCases, 2);
});

module.exports = [].concat(arrWords)
                   .concat(arrRepeats)
                   .concat(arrNames);
