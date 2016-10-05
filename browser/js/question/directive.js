module.exports.bombView = function(){
  return {
    restrict: "E",
    templateUrl: 'js/question/question.html'
  }
};

module.exports.enter = function () {
  return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.enter);
              });
              event.preventDefault();
          }
      });
  };
};

module.exports.esc = function () {
  return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
          if(event.which === 27) {
              scope.$apply(function (){
                  scope.$eval(attrs.esc);
              });
              event.preventDefault();
          }
      });
  };
};

module.exports.defuseResult = function(){
  return {
    restrict: "E",
    templateUrl: 'js/question/defuseResult.html'
  }
};
