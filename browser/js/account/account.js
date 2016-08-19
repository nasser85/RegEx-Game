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
        	}
        }
    });
});

app.controller('AccountCtrl', function($scope, user, UserFactory, userScore, topScore) {
	$scope.user = user;
	$scope.userScore = userScore[0].score;
	$scope.topScore = topScore[0].score;
	console.log($scope);

});