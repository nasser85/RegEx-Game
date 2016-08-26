app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile/:userId/:userName',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            topScore: function(ScoreFactory) {
                return ScoreFactory.fetchTopScores(1);
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
    $scope.maxNum = 50;
    $timeout(function() {
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
    }, 300)
    $scope.first = false;
    if (topScore[0].userId === userScore[0].id) {
        $scope.first = true;
    }
    window.scroll(0,0);
    $scope.topScore = topScore[0].score;

});
