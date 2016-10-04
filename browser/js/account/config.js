module.exports = function ($stateProvider) {
  $stateProvider.state('account', {
    url: '/account',
    templateUrl: 'js/account/account.html',
    controller: 'AccountCtrl',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      topScore: function(ScoreFactory) {
        return ScoreFactory.fetchTopScores(1);
      },
      userScore: function(user, ScoreFactory) {
        return ScoreFactory.fetchUserTopScore(user.id);
      },
      answeredQuestions: function(user, AnswerFactory) {
        return AnswerFactory.fetchUserAnswers(user.id);
      }
    }
  });
};
