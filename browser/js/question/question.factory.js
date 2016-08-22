app.factory('QuestionFactory', function($http, $log, QuestionGeneratorFactory, Utils){
	var questionFactory = {};
	var baseUrl = "/api/question/";

	questionFactory.fetchAll = function(){
		return $http.get(baseUrl)
		.then(Utils.getData)
	}

	questionFactory.fetchById = function(id){
		return $http.get(baseUrl + id)
		.then(Utils.getData)
	}

	questionFactory.postQuestion = function(question){
		return $http.post(baseUrl, question)
		.then(Utils.getData)
	}

	questionFactory.updateQuestion = function(question){
		return $http.put(baseUrl + question.id, question)
	}

	questionFactory.getQuestions = function (numQuestions, difficultyLevel) {
		return $http.post(baseUrl, { numQuestions: numQuestions, difficultyLevel: difficultyLevel })
			.then(Utils.getData)
			.then(function (arrQuestions) {
				QuestionGeneratorFactory(0, difficultyLevel).forEach(generatedQuestion => arrQuestions.push(generatedQuestion));
				return arrQuestions;
			});
	};

	return questionFactory;

})
