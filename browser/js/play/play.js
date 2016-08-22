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

    $scope.getNewQuestions = function(){
        QuestionFactory.getQuestions($scope.numQuestions, $scope.currentWave)
        .then(result => $scope.questions = result)
        .catch($log.error);
    };

    $scope.restartGame = () => $state.reload();

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
        player.canMove = true;
    }

    $scope.diffuse = function(answer, question, userid){
        let diffused = BombFactory.diffuse(answer, question);
        if (diffused) {
            $scope.currentBomb.frame=1;
            $scope.currentBomb.body.enable=false;
            $scope.correct = 1;
            BombFactory.storeUserAnswer(answer, question, userid)
            .catch($log.error);
            $scope.answered = true;
            $scope.score += 100;
            $scope.userform.answer = null;
            $scope.numCorrect++;
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

    $scope.generatedQuestion = new GeneratedQuestion()['anyWhitespace']()['anyNonWhitespace']();

    function checkAnswer (arrRegexes, q) {
      arrRegexes.forEach(function (re, i) {

        var matchTest = q.match[i].every(function (element) {
          return re.test(element);
        });

        var dontMatchTest = re.test(q.doNotMatch[i])

        console.log(matchTest, 'matchTest', q.match[i]);
        console.log(dontMatchTest, 'dontMatchTest', q.doNotMatch[i]);
        if (matchTest && !dontMatchTest) {
          console.log('you got it right');
        } else {
          console.log('incorrect');
        }
      });
    }

    checkAnswer([/\s/, /\S/], $scope.generatedQuestion);
})
