app.config(function ($stateProvider) {
    $stateProvider.state('play', {
        url: '/play',
        template: '<game-canvas></game-canvas>',
        controller: 'PlayCtrl',
        resolve: {
            questions : function(QuestionFactory){
                return QuestionFactory.fetchAll();
            },
            user : function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('PlayCtrl', function ($scope, questions, user, BombFactory) {
    $scope.questions = questions;
    // var randomIndex = Math.floor((Math.random() * questions.length));
    // $scope.currentQuestion = questions[randomIndex];
    // console.log($scope.currentQuestion);
    $scope.user = user;
    $scope.currentBomb = null;
    $scope.questionIndex = 0;
    $scope.answered = false;
    $scope.correct = 0;
    $scope.diffuse = function(answer, question){
        BombFactory.diffuse(answer, question)
        if (BombFactory.diffuse(answer, question)) {
            $scope.correct = 1;
        } else {
            $scope.correct = 2;
        }
        $scope.answered = true;
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
