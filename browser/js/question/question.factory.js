app.factory('QuestionFactory', function($http, $log){
	var questionFactory = {};
	var baseUrl = "/api/question/";
	var getData = res => res.data;

	questionFactory.fetchAll = function(){
		return $http.get(baseUrl)
		.then(getData)
	}

	questionFactory.fetchById = function(id){
		return $http.get(baseUrl + id)
		.then(getData)
	}

	questionFactory.postQuestion = function(question){
		return $http.post(baseUrl, question)
		.then(getData)
	}

	questionFactory.updateQuestion = function(question){
		return $http.put(baseUrl + question.id, question)
	}

	questionFactory.getQuestions = function (numQuestions, difficultyLevel) {
		return $http.post(baseUrl, { numQuestions: numQuestions, difficultyLevel: difficultyLevel })
			.then(getData);
	};

	return questionFactory;

})
