module.exports = function ($stateProvider) {
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
};
