app.factory('ScoreFactory', function($http, $log){
	var scoreFactory = {};
	var baseUrl = "/api/score/";
	var getData = res => res.data;


	scoreFactory.fetchTop10 = function(){
		return $http.get(baseUrl + 'top10')
		.then(getData)
	}

	return scoreFactory;
})

