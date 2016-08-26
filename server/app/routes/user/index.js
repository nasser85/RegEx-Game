'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var AnsweredQuestion = db.model('answeredQuestion');

module.exports = router;
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', function(req, res, next){
    User.findAll()
    .then(function(users){
        res.send(users);
    })
    .catch(next);
});

router.post('/login', function(req, res, next) {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(function(foundUser) {
        res.send(foundUser);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    User.create(req.body)
    .then(function(createdUser) {
        res.send(createdUser);
    })
    .catch(next);
});

router.param('userId', function(req, res, next, userId){
    User.findById(userId)
    .then(function(user){
        if(!user) {
            res.sendStatus(404);
        }else{
            req.user = user;
        }
        next();
    })
    .catch(next);
});

router.get('/:userId', function(req, res, next){
    res.send(req.user);
});

router.put('/:userId', function(req, res, next){
    req.user.update(req.body)
    .then(function(updateduser){
        res.status(204).send(updateduser);
    })
    .catch(next);
});

router.delete('/:userId', function(req, res, next){
    req.user.destroy()
    .then(function(removedUser){  //do we need this?
        res.sendStatus(410)
    });
});

router.post('/:userId/addanswer', function(req, res, next){
    req.user.addQuestion(req.body.questionId, {user_answer: req.body.user_answer})
    .then(function(){
        res.sendStatus(201);
    })
    .catch(next);
});

router.post('/:userId/saveScore', function(req, res, next){
    req.user.createScore({score: req.body.score})
    .then(function(){
        res.sendStatus(201);
    })
    .catch(next);
})



















