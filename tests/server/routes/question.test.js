const expect = require('chai').expect;
const db = require('../../../server/db');
const Question = db.model('question');
const TestCase = db.model('testCase');
const supertest = require('supertest-as-promised');
let app;

beforeEach('sync db', function () {
  app = require('../../../server/app')(db)
  return db.sync({force:true})
})



let agent;
beforeEach('create agent', function () {
  agent = supertest.agent(app)
})

let seedQuestion = {
      text: 'Match some, but not all!',
      category: 'match_some',
      difficulty: 5,
      hint: '',
      answer: '(cats|dogs)',
      forceAnswer: false,
      testCases: [
        { content: 'i love cats', match: true },
        { content: 'i love dogs', match: true },
        { content: 'i love logs', match: false },
        { content: 'i love cogs', match: false }]
}


let seedQuestion2 = {
      text: 'Question 2: Match some, but not all!',
      category: 'match_all',
      difficulty: 7,
      hint: '',
      answer: '(bats|bogs)',
      forceAnswer: true,
      testCases: [
        { content: 'i love cats', match: true },
        { content: 'i love dogs', match: true },
        { content: 'i love bogs', match: false },
        { content: 'i love cogs', match: false }]
}

let seedQuestion3 = {
      text: 'Question 3: Match some, but not all!',
      category: 'match_all',
      difficulty: 3,
      hint: '',
      answer: '(3|3)',
      forceAnswer: true,
      testCases: [
        { content: 'i love #3', match: true },
        { content: 'i #3 dogs', match: true },
        { content: 'i #3 bogs', match: false },
        { content: 'i #3 cogs', match: false }]
}

let seedQuestion4 = {
      text: 'Question 4: Match some, but not all!',
      category: 'match_some',
      difficulty: 4,
      hint: '',
      answer: '(4|4)',
      forceAnswer: true,
      testCases: [
        { content: 'i love #4', match: true },
        { content: 'i #4 dogs', match: true },
        { content: 'i #4 bogs', match: false },
        { content: 'i #4 cogs', match: false }]
}


describe('These are Question Routes: they are working and they can', function () {

  it('add a new question', function () {
    return agent.post('/api/question')
    .send(seedQuestion)
    .then(function(response){
      expect(response.body.text).to.equal(seedQuestion.text);
    });
  });

  it('get an existing question', function () {
      return Question.create(seedQuestion2, {include: [TestCase]})
      .then(function(result){
        return agent.get('/api/question/1')
      })
      .then(function(response){
        expect(response.body.text).to.equal(seedQuestion2.text);
      });
    });

  it('delete an existing question', function () {
      return Question.create(seedQuestion)
      .then(function(result){
        return agent.delete('/api/question/1')
      })
      .then(function(response){
        expect(410)
      });
    });


  it('updates an existing question', function () {
      return Question.create(seedQuestion3, {include: [TestCase]})
      .then(function(result){
        return agent.put('/api/question/1')
        .send({text: 'baaaaalllahhhh'})
        .then(function(response){
        expect(response.body.text).to.equal('baaaaalllahhhh')
      });
    });
  });



});
