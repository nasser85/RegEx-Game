app.factory('ScoreFactory', function($http, $log){
	var scoreFactory = {};
	var baseUrl = "/api/score/";
	var getData = res => res.data;


	scoreFactory.fetchTop10 = function(){
		return $http.get(baseUrl + 'top10')
		.then(getData)
	}

	scoreFactory.fetchTopScore = function(){
		return $http.get(baseUrl + 'topscore')
		.then(getData)
	}

	scoreFactory.fetchUserTopScore = function(id){
		return $http.get(baseUrl + 'user/' + id)
		.then(getData)
	}

	return scoreFactory;
})

