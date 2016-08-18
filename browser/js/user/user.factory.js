app.factory('UserFactory', function($http, $log){
	var userFactory = {};
	var baseUrl = "/api/user/";
	var getData = res => res.data;

	userFactory.fetchAll = function(){
		return $http.get(baseUrl)
		.then(getData)
	}

	userFactory.fetchById = function(id){
		return $http.get(baseUrl + id)
		.then(getData)
	}

	userFactory.postUser = function(user){
		return $http.post(baseUrl, user)
		.then(getData)
	}

	userFactory.updateUser = function(user){
		return $http.put(baseUrl + user.id, user)
	}

	userFactory.deleteUser = function(user){
		return $http.delete(baseUrl+ user.id)
	}

	userFactory.submitAnswer = function(answer, user, question){
		return $http.post(baseUrl + user.id + '/addanswer', {user_answer:answer, questionId: question.id})
	}

	userFactory.storeScore = function(score, userid){
		return $http.post('/api/user/'+ userid +'/saveScore', {
			score: score
		})
	}

	return userFactory;

})