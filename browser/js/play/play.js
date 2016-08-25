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
            },
            highestScore: function(ScoreFactory) {
                return ScoreFactory.fetchTopScore();
            }
        }
    });
});

app.controller('PlayCtrl', function (highestScore, $state, $timeout, $log, $scope, questions, user, BombFactory, QuestionFactory, GeneratedQuestion, UserFactory, ScoreFactory) {
    $scope.highestScore = highestScore[0].score;
    $scope.questions = questions;
    $scope.score = 0;
    $scope.currentWave = 1;
    $scope.numQuestions = 4
    $scope.numCorrect = 0;
    $scope.numExploded = 0;
    $scope.userform = {};
    $scope.user = user;
    $scope.currentBomb = null;
    $scope.questionIndex = 0;
    $scope.answered = false;
    $scope.correct = 0; // are we still using this?
    $scope.counter = 0;

    $scope.resetVal = function(event){
        event.bubbles = false;
    }

    $scope.currentBombActive = function(){
        if($scope.currentBomb){
            let textBox = document.getElementById("text-answer");
            if (textBox) {
                textBox.focus();
            }
        }
        return $scope.currentBomb;
    }

    $scope.getNewQuestions = function(){
        QuestionFactory.getQuestions($scope.numQuestions, $scope.currentWave)
        .then(result => $scope.questions = result)
        .catch($log.error);
    };

    $scope.restartGame = () => $state.reload();

    $scope.onTimeout = function(){
        if ($scope.currentBomb && $scope.counter <= 0) {
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
        console.log('inside leave');
        $scope.userform.answer = null;
        $scope.currentBomb = null;
        $scope.answered = false;
        $scope.correct = 0;
        player.canMove = true;
        RegexGame.game.input.keyboard.enabled = true;
        player.body.position.x -=5;
        $scope.$evalAsync;
    }

    $scope.diffuse = function(answer, question, userid){
        var diffused = false;
        if (question.type === 'Generated') {

            var generatedCheck = BombFactory.diffuse(answer, question, question.index);
        } else {
           diffused = BombFactory.diffuse(answer, question);
        }

        if (generatedCheck) {

            if(question.subQuestions.length > question.index+1) {
                question.index ++;
                var el = document.getElementById("current-question");
                el.className = "magictime holeOut";

                $timeout(function() {
                    el.className = "magictime"
                    question.text = question.subQuestions[question.index];
                    document.getElementById("text-answer").value = "";
                    $scope.$evalAsync();
                }, 1000);

            } else {
                diffused = true;
            }
        }
        if (diffused) {
            $scope.numCorrect++;
            $scope.currentBomb.frame=1;
            $scope.currentBomb.body.enable=false;
            $scope.correct = 1;
            if(userid){
                BombFactory.storeUserAnswer(answer, question, userid)
                .catch($log.error);
            }
            $scope.answered = true;
            $scope.score += 100;
            $scope.userform.answer = null;
            $timeout(function(){
                $scope.currentBomb = null;
                $scope.answered = false;
                $scope.correct = 0;
                question.disarmed = true;
            }, 1500);
        } else if (!generatedCheck) {
            $scope.correct = 2;
            $scope.answered = true;
            $scope.userform.answer = null;
            $timeout(function(){
                $scope.leave();
            }, 2000);
        }
        RegexGame.game.input.keyboard.enabled = true;
        player.canMove = true;
    }

    $scope.goHome = function(){
        $state.go('home');
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
    }

    $scope.backToHome = function(){
        $scope.score = 0;
        $state.go('home');
    }
    $scope.playGame = function(){
        $scope.saveScore = false;
    }
});
