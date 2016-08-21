app.config(function ($stateProvider) {
    $stateProvider.state('answers', {
        url: '/answers/:questionId',
        templateUrl: 'js/answers/answers.html',
        controller: 'AnswerCtrl',
        resolve: {
        	user: function(AuthService) {
        		return AuthService.getLoggedInUser();
        	},
        	answers: function(AnswerFactory, $stateParams) {
                return AnswerFactory.fetchQuestionAnswers($stateParams.questionId);
            }
        }
    });
});

app.controller('AnswerCtrl', function($scope, user, answers) {
    $scope.answers = answers;
    $scope.myAnswer = answers.filter(function(obj) { return obj.userId === user.id})[0];
    $scope.otherAnswers = answers.filter(function(obj) { return obj.userId !== user.id});
    window.scroll(0,0);
    console.log(answers);
});