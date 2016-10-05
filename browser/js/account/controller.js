module.exports = function($scope, user, UserFactory, userScore, topScore, answeredQuestions, $timeout) {
  $scope.user = user;
  $scope.answeredQuestions = answeredQuestions;
  $scope.userScore = 0;
  $scope.diffused = 0;
  $scope.maxNum = 50;
    $timeout(function() {
        $scope.userScore = userScore.length? userScore[0].score : 0;
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


  $scope.topScore = topScore.length ? topScore[0].score : 0;
  $scope.first = false;
  if (topScore[0].userId === $scope.user.id) {
    $scope.first = true;
  }
};
