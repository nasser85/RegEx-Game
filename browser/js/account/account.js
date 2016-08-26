app.config(function ($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl',
        resolve: {
        	user: function(AuthService) {
        		return AuthService.getLoggedInUser();
        	},
        	topScore: function(ScoreFactory) {
        		return ScoreFactory.fetchTopScore();
        	},
        	userScore: function(user, ScoreFactory) {
        		return ScoreFactory.fetchUserTopScore(user.id);
        	},
        	answeredQuestions: function(user, AnswerFactory) {
        		return AnswerFactory.fetchUserAnswers(user.id);
        	}
        }
    });
});

app.controller('AccountCtrl', function($scope, user, UserFactory, userScore, topScore, answeredQuestions, $timeout) {
	$scope.user = user;
	$scope.answeredQuestions = answeredQuestions;
	console.log($scope.answeredQuestions);
	$scope.userScore = 0;
	$scope.diffused = 0;
	$scope.maxNum = 50;
    $timeout(function() {
        if (userScore.length) {
            $scope.userScore = userScore[0].score;
        userScore.forEach(function(el) {
            $scope.diffused += el.score;
        });
        $scope.diffused = $scope.diffused/100;
       if ($scope.diffused > 30) {
            $scope.maxNum = 40;
        } else if ($scope.diffused > 20) {
            $scope.maxNum = 30;
        } else if ($scope.diffused > 10) {
            $scope.maxNum = 20;
        } else {
            $scope.maxNum = 10;
        }
        $scope.$evalAsync();
    }
        
    }, 300)

    $scope.first = false;
	if (topScore.length) {
        $scope.topScore = topScore[0].score;
        if (topScore[0].userId === $scope.user.id) {
            $scope.first = true;
        }
    }
	
	
	
	console.log($scope);

});