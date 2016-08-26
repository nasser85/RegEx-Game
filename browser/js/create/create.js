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
	$scope.user = user;
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
   
    


});