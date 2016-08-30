app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $rootScope, AuthService, AUTH_EVENTS, $state) {
	$scope.user = null;
    console.log('HomeCtrl loaded in line 11 of home.js');

    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };

    $scope.logout = function () {
        AuthService.logout().then(function () {
           $state.go('home');
        });
    };

    var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
            $scope.user = user;
        });
    };

    var removeUser = function () {
        $scope.user = null;
    };

    setUser();

    $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

});
