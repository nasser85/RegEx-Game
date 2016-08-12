app.directive('bombView', function(){
	return {
		restrict: "E",
		templateUrl: 'js/question/question.html'
		// link: function(scope, elem, attrs){
		// 	elem.removeAttr('class').addClass('magictime twisterInDown');
		// 	// class="magictime slideRightRetourn"
		// }
	}
})