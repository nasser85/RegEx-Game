module.exports = function($http, Utils){
	var scoreFactory = {};
	var baseUrl = "/api/score/";

	scoreFactory.fetchTopScores = function(num){
		return $http.get(baseUrl + 'topScores?numScores='+ num)
		.then(Utils.getData)
	}

	scoreFactory.fetchUserTopScore = function(id){
		return $http.get(baseUrl + 'user/' + id)
		.then(Utils.getData)
	}

	return scoreFactory;
};

