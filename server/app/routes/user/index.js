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

router.get('/secret-stash', ensureAuthenticated, function (req, res) {

    var theStash = [
        'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
        'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
        'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
        'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
        'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
        'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
        'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
        'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
        'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
        'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
        'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'
    ];

    res.send(_.shuffle(theStash));

});

router.get('/', function(req, res, next){
    User.findAll()
    .then(function(users){
        res.send(users);
    })
    .catch(next);
})

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
})
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
})

router.get('/:userId', function(req, res, next){
    res.send(req.user)
})


router.put('/:userId', function(req, res, next){
    req.user.update(req.body)
    .then(function(updateduser){
        res.status(204).send(updateduser);
    })
    .catch(next);
})

router.delete('/:userId', function(req, res, next){
    req.user.destroy()
    .then(function(removedUser){  //do we need this?
        res.sendStatus(410)
    })
})

router.post('/:userId/addanswer', function(req, res, next){
    req.user.addQuestion(req.body.questionId, {user_answer: req.body.user_answer})
    .then(function(){
        res.sendStatus(201);
    })
    .catch(next);
})

router.post('/:userId/saveScore', function(req, res, next){
    req.user.createScore({score: req.body.score})
    .then(function(){
        res.sendStatus(201);
    })
    .catch(next);
})



















