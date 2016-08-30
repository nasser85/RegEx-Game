'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/question', require('./question'));
router.use('/score', require('./score'));
router.use('/answers', require('./answered_question'));

router.use(function (req, res, next) {
    res.status(404).end();
});
