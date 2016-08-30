'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Score = db.model('score');
var User = db.model('user');

module.exports = router;

router.get('/topScores', function(req, res, next){
	let numScores = req.query.numScores || 1;
	Score.findAll({
		order: [['score','DESC']],
		limit: numScores,
		include: [{model: User, attributes: ['user_name', 'email']}]
	})
	.then(function(topScores){
		res.send(topScores);
	})
	.catch(next);
});

router.get('/user/:id', function(req, res, next){
	Score.findAll({
		where: {
			userId: req.params.id
		},
		order: [['score','DESC']],
		limit: 1
	})
	.then(function(topScore){
		res.send(topScore);
	})
	.catch(next);
});
