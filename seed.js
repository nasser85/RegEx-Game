/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Question = db.model('question');
var TestCase = db.model('testCase');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedQuestions = function () {
  var questions = [
    {
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
    },
    {
      text: 'Match some, but not all!',
      category: 'match_some',
      difficulty: 2,
      hint: '',
      answer: '^M',
      forceAnswer: false,
      testCases: [
        { content: 'Mission: successful', match: true },
        { content: 'Last Mission: unsuccessful', match: false },
        { content: 'Next Mission: successful upon capture of target', match: false }
      ]
    },
    {
      text: 'Match some, but not all!',
      category: 'match_some',
      difficulty: 3,
      hint: '',
      answer: '^[cmf]an',
      forceAnswer: false,
      testCases: [
        { content: 'can', match: true },
        { content: 'man', match: true },
        { content: 'fan', match: true },
        { content: 'dcan', match: false },
        { content: 'rman', match: false },
        { content: 'pan', match: false }
      ]
    },
    {
      text: 'Match some, but not all!',
      category: 'match_some',
      difficulty: 2,
      hint: '',
      answer: '[^b]og',
      forceAnswer: false,
      testCases: [
        { content: 'hog', match: true },
        { content: 'dog', match: true },
        { content: 'bog', match: false }
      ]
    },
    {
      text: 'Match some, but not all!',
      category: 'match_some',
      difficulty: 3,
      hint: '',
      answer: 'waz{3,5}',
      forceAnswer: false,
      testCases: [
        { content: 'wazzzzzup', match: true },
        { content: 'wazzzup', match: true },
        { content: 'wazup', match: false }
      ]
    },
    {
      text: 'Match some, but not all!',
      category: 'match_some',
      difficulty: 2,
      hint: '',
      answer: '[A-C]',
      forceAnswer: false,
      testCases: [
        { content: 'Ana', match: true },
        { content: 'Bob', match: true },
        { content: 'Cpc', match: true },
        { content: 'aax', match: false },
        { content: 'bby', match: false },
        { content: 'ccz', match: false }
      ]
    },
    {
      text: 'Match all!',
      category: 'match_all',
      difficulty: 3,
      hint: '',
      answer: "\d+",
      forceAnswer: false,
      testCases: [
        { content: 'abc123xyz', match: true },
        { content: 'define "123"', match: true },
        { content: 'var g=123', match: true }
      ]
    },
    {
      text: 'Match all!',
      category: 'match_all',
      difficulty: 1,
      hint: '',
      answer: "abc",
      forceAnswer: false,
      testCases: [
        { content: 'abc', match: true },
        { content: 'abcde"', match: true },
        { content: 'abcdefg', match: true }
      ]
    },
    { text: 'Matches beginning of input. If the multiline flag is set to true, also matches immediately after a line break character',
     category: 'validation',
     difficulty: 1,
     hint: '',
     answer: '^',
     forceAnswer: true
   },
   { text: 'Matches end of input. If the multiline flag is set to true, also matches immediately before a line break character',
     category: 'validation',
     difficulty: 1,
     hint: '',
     answer: '$',
     forceAnswer: true
   },
   { text: 'Matches the preceding expression 0 or more times. Equivalent to {0,}',
     category: 'validation',
     difficulty: 1,
     hint: '',
     answer: '*',
     forceAnswer: true
   },
   { text: 'Matches the preceding expression 1 or more times. Equivalent to {1,}',
     category: 'validation',
     difficulty: 1,
     hint: '',
     answer: '+',
     forceAnswer: true
   },
   { text: 'Matches the preceding expression 0 or 1 times. Equivalent to {0,1}',
     category: 'validation',
     difficulty: 1,
     hint: '',
     answer: '?',
     forceAnswer: true
   }
  ];

  var creatingQuestions = questions.map(function (questionObj) {
      return Question.create(questionObj, {
        include: [TestCase]
      });
  });

  return Promise.all(creatingQuestions);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
      return seedQuestions();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
