var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Question = db.model('question');

var arrQuestions = [
  { category: 'match_some', difficulty: 4 },
  { category: 'match_some', difficulty: 2 },
  { category: 'match_some', difficulty: 1 },
  { category: 'match_some', difficulty: 1 },
  { category: 'match_some', difficulty: 1 },
  { category: 'match_some', difficulty: 1 },
  { category: 'match_some', difficulty: 1 }
];

describe('Question model', function () {

    beforeEach('Sync DB', function () {
      return db.drop()
      .then(function () {
        return db.sync({ force: true });
      });
    });

    describe('getQuestions class method', function () {
      it('should return the appropriate number of questions, randomly sorted', function () {
        return Promise.all(arrQuestions.map(function (obj) {
          return Question.create(obj);
        }))
        .then(function () {
          return Question.getQuestions(99, 3);
        })
        .then(function (questions) {
          return questions.map(question => question.difficulty);
        })
        .then(function (questions) {
          var countOfOnes = questions.reduce(function (x, y) {
            return y === 1 ? x + 1 : x;
          }, 0);
          var countOfTwos = questions.reduce(function (x, y) {
            return y === 2 ? x + 1 : x;
          }, 0);
          expect(questions).to.have.length(6);
          expect(countOfOnes).to.equal(5);
          expect(countOfTwos).to.equal(1);
        });
      });
    });
});
