
app.factory("BombFactory", function(){

	var bombFactory = {};

	bombFactory.diffuse = function(userAnswer, question){
		var result = true;
		var regexAnswer = new RegExp(userAnswer);
		
		question.testCases.forEach(function(testCase){
		
			if(testCase.match){
				if(!regexAnswer.test(testCase.content)) {
					result = false;
				}
			}else{
				if(regexAnswer.test(testCase.content)){
					result = false;
				}
			}
		})
		console.log(result);
	return result;
	}
	// bombFactory.hint = function(){

	// }

	bombFactory.leave = function(currentBomb){
		currentBomb = null;
	}

	return bombFactory;


});