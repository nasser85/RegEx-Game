var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('userTestCase', {
  content: {
    type: Sequelize.STRING
  },
  match: {
    type: Sequelize.BOOLEAN
  }
});