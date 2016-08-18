app.factory('ScoreFactory', function($http, $log){
	var scoreFactory = {};
	var baseUrl = "/api/score/";
	var getData = res => res.data;

	return scoreFactory;
})