// app.directive('bombView', function() {
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'js/bomb/bomb-view.html',
// 		link: function(scope, elem, attrs) {
// 			elem.bind()
// 		}
// 	}
// })
window.onload = function() {

	var bomb = document.getElementById('bomb-view');
	function toggleClass() {
		bomb.style.display = 'none';

	}
	if (bomb) {
		bomb = bomb.addEventListener("click", toggleClass);
	}
	
}
