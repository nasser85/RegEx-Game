'use strict';

app.factory('QuestionGeneratorFactory', function (GeneratedQuestion, Utils) {
  var methods = Utils.difference(Object.keys(GeneratedQuestion.prototype), ['lastIndex', 'generate']);

  return function (numQuestions, difficultyLevel) {
    var arrQuestions = [];
    var question;
    for (var i = 0; i < numQuestions; i++) {

      question = new GeneratedQuestion();

      for (var j = 0; j < difficultyLevel; j++) {
        var randomMethod = methods[Utils.random(0, methods.length - 1)];
        question = question[randomMethod]();
      }

      arrQuestions.push(question);
    }

    return arrQuestions;
  };
});
