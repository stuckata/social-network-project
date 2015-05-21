"use strict";

app.controller('LoginController', function ($scope, $rootScope, $location, authenticationService, notificationService) {

	$scope.login = function(userData) {
        authenticationService.login(userData,
            function success() {
                notificationService.showInfo("Login successful");
                $location.path("/home");
            },
            function error(err) {
                notificationService.showError("Login failed", err);
            }
        );
    };
    
    $scope.registerView = function() {
        $location.path("/register");
    };
});