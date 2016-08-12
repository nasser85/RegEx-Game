
app.config(function ($stateProvider) {
    $stateProvider.state('question', {
        url: '/question',
        templateUrl: 'js/question/question.html',
        controller: 'QuestionCtrl',
        resolve: {
        	questions : function(QuestionFactory){
        		return QuestionFactory.fetchAll();
        	},
        	user : function(AuthService) {
        		return AuthService.getLoggedInUser();
        	}
        }
    });
});

app.controller('QuestionCtrl', function($scope, questions, UserFactory, AuthService, $log, user){
	var randomIndex = Math.floor((Math.random() * questions.length));
	$scope.currentQuestion = questions[randomIndex];
	$scope.user = user;
	
	$scope.submit = UserFactory.submitAnswer;
	console.log($scope.user);

})