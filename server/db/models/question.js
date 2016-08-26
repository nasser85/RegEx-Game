
var Sequelize = require('sequelize');

var db = require('../_db');
var TestCase = require('./test_case');

var Question = db.define('question', {
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
	},
	forceAnswer: {
		type: Sequelize.BOOLEAN
	},
	authorId: {
		type: Sequelize.INTEGER,
		defaultValue: null
	}

}, {
	defaultScope: {
		include: [TestCase]
	},
	classMethods: {
		getQuestions: function (numQuestions, difficultyLevel) {
			return Question.findAll({
				where: {
					difficulty: {
						$lte: difficultyLevel
					}
				},
				order: [
					Sequelize.fn( 'RANDOM' ),
				]
			}).then(function (result) {
				return result.slice(0, numQuestions);
			})
		}
	}
});

module.exports = Question;
