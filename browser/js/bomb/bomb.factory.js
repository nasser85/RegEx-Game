
app.factory("BombFactory", function($http){

	var bombFactory = {};

	bombFactory.checkAnswerGenerated = function(userAnswer, q, index) {
      
      	let answer = new RegExp(userAnswer);

        var matchTest = q.match[index].every(function (element) {
          return answer.test(element);
        });

        var dontMatchTest = answer.test(q.doNotMatch[index])

        console.log(matchTest, 'matchTest', q.match[index]);
        console.log(dontMatchTest, 'dontMatchTest', q.doNotMatch[index]);
        if (matchTest && !dontMatchTest) {
          console.log('you got it right');
          return true;
        } else {
          console.log('incorrect');
          return false;
        }
    }


	bombFactory.diffuse = function(userAnswer, question, index){
		if (question.type === 'Generated') {
			return bombFactory.checkAnswerGenerated(userAnswer, question, index);
		} else {

			var result = true;
			if(question.category === 'match_some'){
			let regexAnswer = new RegExp(userAnswer);
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
			return result;	

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

	
	bombFactory.storeUserAnswer = function(answer, question, userid){
		return $http.post('/api/user/'+ userid +'/addanswer', {
			questionId: question.id,
			user_answer: answer
		})
	}

	bombFactory.leave = function(currentBomb){
		return currentBomb = null;
	}

	return bombFactory;

});