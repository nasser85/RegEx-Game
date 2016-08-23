app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile/:userId/:userName',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            topScore: function(ScoreFactory) {
                return ScoreFactory.fetchTopScore();
            },
            userScore: function($stateParams, ScoreFactory) {
                return ScoreFactory.fetchUserTopScore($stateParams.userId);
            }
        }
    });
});

app.controller('ProfileCtrl', function($scope, userScore, topScore, $timeout, $stateParams) {
    $scope.profileName = $stateParams.userName;
    $scope.userScore = 0;
    $scope.diffused = 0;
    $timeout(function() {
        $scope.userScore = userScore[0].score;
        $scope.diffused = 100*($scope.userScore/100)/(4*Math.round($scope.userScore/400));
        $scope.$evalAsync();
    }, 300)

    $scope.topScore = topScore[0].score;

});