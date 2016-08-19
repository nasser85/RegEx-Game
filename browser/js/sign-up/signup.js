app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/sign-up/sign-up.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, UserFactory, $state, AuthService) {

    $scope.signUp = {};
    $scope.error = null;

    $scope.createAccount = function(signUpStuff) {
        $scope.error = null;

        UserFactory.postUser(signUpStuff)
        .then(function(createdUser) {
            
            return AuthService.login({email: createdUser.email, password: signUpStuff.password}).then(function () {
                if(!$scope.saveScore){
                    $state.go('home');
                }else{
                    AuthService.getLoggedInUser().then(function (user) {
                        $scope.user = user;
                    });
                }
            }).catch(function () {
                $scope.error = 'Incorrect email and password.  Please try again!';
            });
        })
        .catch(function() {
            $scope.error = "Please choose another email."
        })
    }
    

});