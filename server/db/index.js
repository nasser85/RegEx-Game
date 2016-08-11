'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Question = require('./models/question');
var TestCase = require('./models/test_case');
var AnsweredQuestion = require('./models/answered_question')

User.belongsToMany(Question, {through: AnsweredQuestion});  // Project.belongsToMany(User, {through: 'UserProject'});
Question.belongsToMany(User, {through: AnsweredQuestion});  // User.belongsToMany(Project, {through: 'UserProject'});
// This will create a new model called UserProject with the equivalent foreign keys projectId and userId

TestCase.belongsTo(Question); // Player.belongsTo(Team);  Will add a teamId attribute to Player
Question.hasMany(TestCase); // Project.hasMany(User, {as: 'Workers'})   This will add the attribute projectId or project_id to User. Instances of Project will get the accessors getWorkers and setWorkers.


Question.hasMany(AnsweredQuestion);
AnsweredQuestion.belongsTo(Question);
