'use strict'

const router = require('express').Router();
const db = require('../../../db');
const AnsweredQuestion = db.model('answeredQuestion');
const Question = db.model('question');
const User = db.model('user');

module.exports = router;

router.get('/questions/:userId', function(req, res, next) {
	AnsweredQuestion.findAll({
		where: {
			userId: req.params.userId
		},
		include: [Question]
	})
	.then(function(answeredQuestions) {
		res.send(answeredQuestions);
	})
	.catch(next);
});

router.get('/all/:questionId', function(req, res, next) {
	AnsweredQuestion.findAll({
		where: {
			questionId: req.params.questionId
		},
		include: [Question, User]
	})
	.then(function (answers) {
		res.send(answers);
	})
	.catch(next);
});
