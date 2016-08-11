
app.config(function ($stateProvider) {
    $stateProvider.state('question', {
        url: '/question',
        templateUrl: 'js/question/question.html',
        controller: 'QuestionCtrl',
        resolve: {
        	questions : function(QuestionFactory){
        		return QuestionFactory.fetchAll();
        	}
        }
    });
});

app.controller('QuestionCtrl', function($scope, questions){
	var randomIndex = Math.floor((Math.random() * questions.length));
	$scope.currentQuestion = questions[randomIndex];


})