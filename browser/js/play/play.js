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

app.controller('PlayCtrl', function ($timeout, $log, $scope, questions, user, BombFactory) {
    $scope.questions = questions;
    $scope.currentWave = 1;
    $scope.getNewQuestions = function(){console.log('hey')};
    $scope.userform = {};
    $scope.user = user;
    $scope.currentBomb = null;
    $scope.questionIndex = 0;
    $scope.answered = false;
    $scope.correct = 0;
    $scope.diffuse = function(answer, question, userid){
        question.disarmed = false;
        console.log(answer, question, userid);
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
                $scope.currentBomb = null;
                $scope.answered = false;
                $scope.correct = 0;
            }, 2000);
        }

    }

    $scope.leave = function(){
        $scope.currentBomb = null;
        $scope.answered = false;
        $scope.correct = 0;
    }

    $scope.incrementQuestionIndex = function () {
            let newIndex = $scope.questionIndex + 1;
            newIndex === $scope.questions.length ? $scope.questionIndex = 0 :
                $scope.questionIndex = newIndex;
    }

})
