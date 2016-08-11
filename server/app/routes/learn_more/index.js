'use strict'

var router = require('express').Router();
var db = require('../../../db');
var Question = db.model('question');
var LearnMore = db.model('learnMore');

module.exports = router;

router.params('id', function(req, res, next, id){
	LearnMore.findById(id) //too slow?
	.then(function(learnmore){
		if(!learnmore) {
			res.sendStatus(404);
		}else{
			req.learnmore = learnmore;
		}
		next();
	})
	.catch(next);
})

router.get('/', function(req, res, next){
	LearnMore.findAll()
	.then(function(learnMores){
		res.send(learnMores);
	})
	.catch(next);
})

router.post('/', function(req, res, next){
	LearnMore.create(req.body)
	.then(function(newLearnMore){
		res.status(201).send(newLearnMore);
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	return res.send(req.learnmore);
})

router.put('/:id', function(req, res, next){
	req.learnmore.update(req.body)
	.then(function(updatedlearnmore){
		res.status(204).send(updatedlearnmore);
	})
	.catch(next);
})

router.delete('/:id', function(req, res, next){
	req.learnmore.destroy()
	.then(function(removedlearnmore){  //do we need this?
		res.sendStatus(410)
	})
})

