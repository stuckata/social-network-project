"use strict";

app.controller('RegisterController', function ($scope, $location, authenticationService, notificationService) {
	
	$scope.register = function(userData) {
        if (authenticationService.isLoggedIn()) {
            authenticationService.logout();
	    }
		authenticationService.register(userData,
            function success() {             
                notificationService.showInfo("User registered successfully");
                $location.path("/home");
            },
			function error(err) {
                notificationService.showError("User registration failed", err);
            });        
    };
    
    $scope.loginView = function() {
        $location.path("/");
    };
});