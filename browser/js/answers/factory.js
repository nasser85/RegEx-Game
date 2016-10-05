module.exports = function($http, Utils) {
  var answerFactory = {};
  var baseUrl = "/api/answers/";

  answerFactory.fetchUserAnswers = function(userId) {
    return $http.get(baseUrl + 'questions/' + userId)
    .then(Utils.getData);
  }

  answerFactory.fetchQuestionAnswers = function(questionId) {
    return $http.get(baseUrl + 'all/' + questionId)
    .then(Utils.getData);
  }

  return answerFactory;
};
