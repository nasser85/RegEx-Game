app.factory('ScoreFactory', function($http, $log, Utils){
	var scoreFactory = {};
	var baseUrl = "/api/score/";

	scoreFactory.fetchTop10 = function(){
		return $http.get(baseUrl + 'top10')
		.then(Utils.getData)
	}

	scoreFactory.fetchTopScore = function(){
		return $http.get(baseUrl + 'topscore')
		.then(Utils.getData)
	}

	scoreFactory.fetchUserTopScore = function(id){
		return $http.get(baseUrl + 'user/' + id)
		.then(Utils.getData)
	}

	return scoreFactory;
})

