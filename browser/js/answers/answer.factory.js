app.factory('AnswerFactory', function($http) {
	var answerFactory = {};
	var baseUrl = "/api/answers/";
	var getData = res => res.data;

	answerFactory.fetchUserAnswers = function(userId) {
		return $http.get(baseUrl + 'questions/' + userId)
		.then(getData);
	}

	answerFactory.fetchQuestionAnswers = function(questionId) {
		return $http.get(baseUrl + 'all/' + questionId)
		.then(getData);
	}

	return answerFactory;
})