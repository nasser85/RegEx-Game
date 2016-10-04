module.exports = function ($stateProvider) {
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
};
