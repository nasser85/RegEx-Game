'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Score = db.model('score');
var User = db.model('user');

module.exports = router;



router.get('/topscore', function(req, res, next){
	Score.findAll({
		order: [['score','DESC']],
		limit: 1
	})
	.then(function(topScore){
		res.send(topScore);
	})
	.catch(next);
});

router.get('/top10', function(req, res, next){
	Score.findAll({
		order: [['score','DESC']],
		limit: 10,
		include: [{model: User, attributes: ['user_name', 'email']}]
	})
	.then(function(top10Scores){
		res.send(top10Scores);
	})
	.catch(next);
});

router.get('/user/:id', function(req, res, next){
	Score.findAll({
		where: {
			userId: req.params.id
		},
		order: [['score','DESC']]
	})
	.then(function(topUserScore){
		res.send(topUserScore);
	})
	.catch(next);
});



