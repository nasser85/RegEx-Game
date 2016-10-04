module.exports = function($http){

	var validateAnswerFactory = {};

	validateAnswerFactory.checkAnswerGenerated = function(userAnswer, q, index) {

      	var answer = new RegExp(userAnswer);

        var matchTest = q.match[index].every(function (element) {
          return answer.test(element);
        });

        var dontMatchTest = answer.test(q.doNotMatch[index])

        if (matchTest && !dontMatchTest) {
          return true;
        } else {
          return false;
        }
    }


	validateAnswerFactory.defuse = function(userAnswer, question, index){
		if (userAnswer.charAt(0) === "/" && userAnswer.charAt(userAnswer.length-1) === "/") {
			userAnswer = userAnswer.substring(1, userAnswer.length-1);
		}
		if (question.type === 'Generated') {
			return validateAnswerFactory.checkAnswerGenerated(userAnswer, question, index);
		} else {

			if(question.category === 'match_some'){

				for (var j = 0; j < question.testCases.length; j++) {
					let regexAnswer = new RegExp(userAnswer);
					var testCase = question.testCases[j];
					var arr = regexAnswer.exec(testCase.content);
					if(testCase.match){
						if(arr === null){
							return false;
						}
						var matchedStr = arr[0];
						if(matchedStr !== testCase.content){
							return false;
						}

					}else{
						if(arr !== null){
							var matchedStr = arr[0];
							if(matchedStr === testCase.content){
								return false;
							}
						}

					}
				}
				return true;

			}else if(question.category === 'validation'){
				if(question.answer !== userAnswer){
					result = false;
				}
				return result;

			}else if(question.category === 'match_all'){
				let regexAnswer = new RegExp(userAnswer);
				for(var i = 0; i < question.testCases.length; i++){
					if(regexAnswer.test(question.testCases[i].content) == false){
						return false;
					}
				}
				return true;
			}
	}
	}


	validateAnswerFactory.storeUserAnswer = function(answer, question, userid){
		return $http.post('/api/user/'+ userid +'/addanswer', {
			questionId: question.id,
			user_answer: answer
		})
	}

	validateAnswerFactory.leave = function(currentBomb){
		return currentBomb = null;
	}

	return validateAnswerFactory;

};
