'use strict';

app.factory('QuestionGeneratorFactory', function (GeneratedQuestion, StackFactory) {
  var methods = _.shuffle(Utils.difference(Object.keys(GeneratedQuestion.prototype), ['lastIndex', 'generate']));

  var methodStack = new StackFactory();

  methods.forEach(function (method) {
    methodStack.push(method);
  });

  return function (numQuestions, difficultyLevel) {
    var arrQuestions = [];
    var question;
    for (var i = 0; i < numQuestions; i++) {

      question = new GeneratedQuestion();

      for (var j = 0; j < difficultyLevel; j++) {
        if (!methodStack.top) {
          methods.forEach(function (method) {
            methodStack.push(method);
          });
        }
        var randomMethod = methodStack.pop().value;
        question = question[randomMethod]();
      }

      arrQuestions.push(question);
    }

    return arrQuestions;
  };
});
