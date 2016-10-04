module.exports = function($http, $log, Utils){
  var userFactory = {};
  var baseUrl = "/api/user/";

  userFactory.fetchAll = function(){
    return $http.get(baseUrl)
    .then(Utils.getData)
  }

  userFactory.fetchById = function(id){
    return $http.get(baseUrl + id)
    .then(Utils.getData)
  }

  userFactory.postUser = function(user){
    return $http.post(baseUrl, user)
    .then(Utils.getData)
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

};
