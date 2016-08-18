app.config(function ($stateProvider) {
    $stateProvider.state('play', {
        url: '/play',
        template: '<game-canvas></game-canvas>',
        controller: 'PlayCtrl',
        resolve: {
            questions : function(QuestionFactory){
                return QuestionFactory.getQuestions(4,1);
            },
            user : function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('PlayCtrl', function ($timeout, $log, $scope, questions, user, BombFactory, UserFactory, QuestionFactory, ScoreFactory) {
    $scope.questions = questions;
    $scope.currentWave = 1;
    $scope.getNewQuestions = function(){
        QuestionFactory.getQuestions(4, $scope.currentWave)
        .then(result => $scope.questions = result)
        .catch($log.error);
    };
    $scope.userform = {};
    $scope.user = user;
    $scope.currentBomb = null;
    $scope.questionIndex = 0;
    $scope.answered = false;
    $scope.correct = 0;

    $scope.counter = 0;
    $scope.onTimeout = function(){
        if ($scope.currentBomb && $scope.counter === 0) {
            $scope.correct = 3;
            $scope.answered = true;
            $timeout(function(){
                $scope.leave();
            }, 2000);
            currentTimeout = 0;
        } else {
            $scope.counter-= 1;
            currentTimeout = $timeout($scope.onTimeout,1000);
        }
        
    }
    var currentTimeout = $timeout($scope.onTimeout,1000);

    $scope.leave = function(){
        $scope.currentBomb = null;
        $scope.answered = false;
        $scope.correct = 0;
    }

    $scope.diffuse = function(answer, question, userid){
       
        let diffused = BombFactory.diffuse(answer, question);
        if (diffused) {
            $scope.correct = 1;
            // BombFactory.storeUserAnswer(answer, question, userid)
            // .catch($log.error);
            $scope.answered = true;
            $scope.userform.answer = null;
            $timeout(function(){
                $scope.currentBomb = null;
                $scope.answered = false;
                $scope.correct = 0;
                question.disarmed = true;
            }, 2000);
        } else {
            $scope.correct = 2;
            $scope.answered = true;
            $scope.userform.answer = null;
            $timeout(function(){
                $scope.leave();
            }, 2000);
        }

    }

    $scope.incrementQuestionIndex = function () {
        let newIndex = $scope.questionIndex + 1;
        newIndex === $scope.questions.length ? $scope.questionIndex = 0 :
            $scope.questionIndex = newIndex;
    }

    $scope.saveToDatabase = function(score, userId){
        UserFactory.storeScore(score, userId)
        .then(function(){
            return ScoreFactory.fetchTop10();
        })
        .then(function(top10){
            $scope.topScores = top10;
            $scope.scoreSubmitted = true;
        })
        .catch($log.error);
        $scope.scoreSubmitted = true;
    }

    $scope.backToGame = function(){
        $scope.saveScore = false;
    }

})
