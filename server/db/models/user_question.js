var Sequelize = require('sequelize');

var db = require('../_db');
var UserTestCase = require('./user_test_case');

var UserQuestion = db.define('userQuestion', {
	text: {
		type: Sequelize.TEXT
	},
	category: {
		type: Sequelize.ENUM('match_all', 'match_some', 'validation')
	},
	answer: {
		type: Sequelize.STRING
	},
	forceAnswer: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	authorId: {
		type: Sequelize.INTEGER
	}

}, {
	defaultScope: {
		include: [UserTestCase]
	}
});

module.exports = UserQuestion;