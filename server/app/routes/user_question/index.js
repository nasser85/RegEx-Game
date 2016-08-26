'use strict'
const router = require('express').Router();
const db = require('../../../db');
const UserQuestion = db.model('userQuestion');
const UserTestCase = db.model('userTestCase');
const TestCase = db.model('testCase');
const Question = db.model('question');

module.exports = router;

router.get('/', function(req, res, next){
	UserQuestion.findAll()
	.then(function(allQuestions){
		res.send(allQuestions);
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	UserQuestion.create(req.body, {
			include: [UserTestCase]
		})
		.then(function (createdQuestion) {
			res.status(201).send(createdQuestion);
		})
		.catch(next);
});

router.get('/pending/:userId', function(req, res, next) {
	UserQuestion.findAll({
		where: {
			authorId: req.params.userId
		}
	})
	.then(function (userQuestions) {
		res.status(200).send(userQuestions);
	})
	.catch(next);
})

router.get('/question/:questionId', function(req, res, next) {
	UserQuestion.findAll({
		where: {
			questionId: req.params.questionId
		}
	})
	.then(function (userQuestions) {
		res.status(200).send(userQuestions);
	})
	.catch(next);
})

router.get('/published/:userId', function(req, res, next) {
	Question.findAll({
		where: {
			authorId: req.params.userId
		}
	})
	.then(function (userQuestions) {
		res.status(200).send(userQuestions);
	})
	.catch(next);
})