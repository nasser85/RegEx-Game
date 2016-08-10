
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('question', {
	text: {
		type: Sequelize.TEXT
	},
	category: {
		type: Sequelize.ENUM('match_all', 'match_some', 'capture_group', 'validation', 'multiple_choice')
	},
	difficulty: {
		type: Sequelize.INTEGER,
		validate: {
			min: 1,
			max: 11
		}
	},
	hint: {
		type: Sequelize.STRING
	},
	answer: {
		type: Sequelize.STRING
	}

})