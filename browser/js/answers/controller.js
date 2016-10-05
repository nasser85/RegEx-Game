module.exports = function ($scope, user, answers) {
  $scope.answers = answers;
  $scope.myAnswer = answers.filter(function(obj) { return obj.userId === user.id})[0];
  $scope.otherAnswers = answers.filter(function(obj) { return obj.userId !== user.id});
  window.scroll(0,0);
};
