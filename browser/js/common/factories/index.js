module.exports = function (app) {
  app.factory('CharacterCodeFactory', require('./CharacterCodeFactory'));
  app.factory('GeneratedQuestion', require('./GeneratedQuestion'));
  app.factory('QuestionGeneratorFactory', require('./QuestionGeneratorFactory'));
  app.factory('ScoreFactory', require('./ScoreFactory'));
  app.factory('StackFactory', require('./StackFactory'));
  app.factory('Utils', require('./UtilsFactory'));
  app.factory('ValidateAnswerFactory', require('./ValidateAnswerFactory'))
};
