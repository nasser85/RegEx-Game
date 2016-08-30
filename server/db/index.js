'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Question = require('./models/question');
var TestCase = require('./models/test_case');
var AnsweredQuestion = require('./models/answered_question');
var Score = require('./models/score');

User.belongsToMany(Question, {through: AnsweredQuestion});
Question.belongsToMany(User, {through: AnsweredQuestion});
TestCase.belongsTo(Question);
Question.hasMany(TestCase);

Question.hasMany(AnsweredQuestion);
AnsweredQuestion.belongsTo(Question);
AnsweredQuestion.belongsTo(User);

Score.belongsTo(User);
User.hasMany(Score);

