'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Question = require('./models/question');
var AnsweredQuestion = require('./models/answered_question')
var LearnMore = require('./models/learn_more');

User.belongsToMany(Question, {through: AnsweredQuestion});
Question.belongsToMany(User, {through: AnsweredQuestion});

LearnMore.belongsToMany(Question, {through: 'link'});
Question.belongsToMany(LearnMore, {through: 'link'});


