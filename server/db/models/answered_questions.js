var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('answeredQuestion', {
	user_answer: {
		type: Sequelize.STRING
	}
})