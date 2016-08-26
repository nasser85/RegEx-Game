'use strict';

module.exports = function MatchSomeButNotAll (testCases, difficulty, hint, answer) {
  this.testCases = testCases || [];
  this.difficulty = difficulty || 1;
  this.hint = hint || '';
  this.answer = answer || '';
  this.text = 'Match some, but not all!';
  this.category = 'match_some';
  this.forceAnswer = false
};
