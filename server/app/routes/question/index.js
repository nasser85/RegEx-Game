'use strict'

var router = require('express').Router();
var db = require('../../../db');
var Question = db.model('question');
var LearnMore = db.model('learnMore');

module.exports = router;


router.params('id', function(req, res, next, id){
	Question.findById(id, {include: [LearnMore]})
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
	var question;
	Question.create(req.body)
	.then(function(createdQuestion){
		question = createdQuestion;
		return createdQuestion.addLearnMore(req.body.learnMoreId); //test this.
	})
	.then(function(){
		res.status(201).send(question);
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	return res.send(req.question);
})


router.put('/:id', function(req, res, next){
	var question;
	req.question.update(req.body)
	.then(function(updatedQuestion){
		question = updatedQuestion;
		return updatedQuestion.setLearnMore(req.body.learnMoreId); //test this!!
	})
	.then(function(){
		res.status(204).send(question);
	})
	.catch(next);
})












