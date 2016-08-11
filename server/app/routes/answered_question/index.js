'use strict'

var router = require('express').Router();
var db = require('../../../db');
var AnsweredQuestion = db.model('answeredQuestion');
var User = db.model('user');

module.exports = router;



