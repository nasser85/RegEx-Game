app.factory('CreateFactory', function($http, $log, Utils) {
	var createFactory = {};
	var baseUrl = "/api/create/";

	createFactory.fetchAll = function(){
		return $http.get(baseUrl)
		.then(Utils.getData)
	}

	createFactory.fetchById = function(id){
		return $http.get(baseUrl + 'question/' + id)
		.then(Utils.getData)
	}

	createFactory.postQuestion = function(question){
		return $http.post(baseUrl, question)
		.then(Utils.getData)
	}

	createFactory.getPublishedByUserId = function(userId){
		return $http.get(baseUrl + 'published/' + userId)
		.then(Utils.getData)
	}

	createFactory.getPendingByUserId = function(userId){
		return $http.get(baseUrl + 'pending/' + userId)
		.then(Utils.getData)
	}


	return createFactory;

})