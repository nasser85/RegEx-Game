'use strict'
const router = require('express').Router();
const db = require('../../../db');
const Question = db.model('question');
const AnsweredQuestion = db.model('answeredQuestion');
const TestCase = db.model('testCase');


module.exports = router;


router.param('id', function(req, res, next, id){
	Question.findById(id)
	.then(function(question){
		if(!question) {
			res.sendStatus(404);
		}else{
			req.question = question;
		}
		next();
	})
	.catch(next);
})


router.get('/', function(req, res, next){
	Question.findAll()
	.then(function(allQuestions){
		res.send(allQuestions);
	})
	.catch(next);
})

router.post('/', function(req, res, next){
		Question.create(req.body, {
		include: [TestCase]
	})
	.then(function(createdQuestion){
		res.status(201).send(createdQuestion);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	res.send(req.question);
})


router.put('/:id', function(req, res, next){
	req.question.update(req.body)
	.then(function(updatedQuestion){
		res.send(updatedQuestion)
		})
	.catch(next);
})

router.delete('/:id', function(req, res, next){
	req.question.destroy()
	.then(function(removedQuestion){
		res.sendStatus(410)
	})
})











