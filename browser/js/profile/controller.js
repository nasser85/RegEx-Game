module.exports = function($scope, userScore, topScore, $timeout, $stateParams) {
    $scope.profileName = $stateParams.userName;
    $scope.userScore = 0;
    $scope.defused = 0;
    $scope.maxNum = 50;
    $timeout(function() {
        $scope.userScore = userScore[0].score;
        userScore.forEach(function(el) {
            $scope.defused += el.score;
        });
        $scope.defused = $scope.defused/100;
        if ($scope.defused > 30) {
            $scope.maxNum = 40;
        } else if ($scope.defused > 20) {
            $scope.maxNum = 30;
        } else if ($scope.defused > 10) {
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

};
