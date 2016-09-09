app.config(function ($stateProvider) {
    $stateProvider.state('create', {
        url: '/create',
        templateUrl: 'js/create/create.html',
        controller: 'CreateCtrl',
        resolve: {
        	user: function(AuthService) {
        		return AuthService.getLoggedInUser();
        	},
            pendingQuestions: function(user, CreateFactory) {
                return CreateFactory.getPendingByUserId(user.id);
            },
            publishedQuestions: function(user, CreateFactory) {
                return CreateFactory.getPublishedByUserId(user.id);
            }

        }
    });
});

app.controller('CreateCtrl', function($scope, user, pendingQuestions, publishedQuestions, BombFactory, CreateFactory) {
	$scope.prompts = ["Select a Question Type", "Enter your Answer", "Select the Number of POSITIVE Test Cases", "Enter Your POSITIVE Test Cases", "Select the Number of NEGATIVE Test Cases", "Enter Your NEGATIVE Test Cases"]
    $scope.placeHolders = ["your question here...", "your answer here...", "your test case here..."]
    $scope.clues = ['Questions of the "Matching" type do not need a written question.  However, for "Validation" types, a descriptive question is required.', 'This should be a regular expression.', 'These test cases should return TRUE when tested against your regular expression.', 'This should be a regular expression.', 'These test cases should return FALSE when tested against your regular expression.'];
   $scope.pos = 0;
    $scope.user = user;
    console.log($scope);
    $scope.userQuestion = {
        authorId: user.id,
        category: 'match_some',
        forceAnswer: false,
        testCases: [
            {
                content: null,
                match: true
            },
            {
                content: null,
                match: true
            },
            {
                content: null,
                match: true
            },
            {
                content: null,
                match: false
            },
            {
                content: null,
                match: false
            },
            {
                content: null,
                match: false
            }
        ]
    };
    $scope.view = null;
    $scope.pendingQuestions = pendingQuestions;
    $scope.publishedQuestions = publishedQuestions;
    $scope.ready = 0;
    $scope.create = function() {
        $scope.view = 'create';
    }
    $scope.pending = function() {
        $scope.view = 'pending';
    }
    $scope.published = function() {
        $scope.view = 'published';
    }
    $scope.test = function() {
        console.log($scope.userQuestion)
        if(BombFactory.diffuse($scope.userQuestion.answer, $scope.userQuestion)) {
            $scope.ready = 1;
            $scope.userQuestion.testCases = $scope.userQuestion.testCases.filter(function(testCase) {
                return testCase.content != null;
            })
        } else {
            $scope.ready = 2;
        }
        console.log($scope.ready);
    }
    $scope.okay = function() {
        $scope.ready = 0;
    }
    $scope.submitQuestion = function (question) {
        question.userTestCases = question.testCases;
        CreateFactory.postQuestion(question);
    }
    $scope.chooseMatch = function () {
        document.getElementById('user-input').disabled = true;
    }
    $scope.chooseValidate = function () {
        document.getElementById('user-input').disabled = false;
    }

    $scope.proceed = function () {
        $scope.pos ++;
        // $scope.$evalAsync();
    } 
    $scope.back = function () {
        $scope.pos --;
        // $scope.$evalAsync();
    } 
    console.log($scope.placeHolder);
   
    


});