var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('score', {
	score: Sequelize.INTEGER
});
