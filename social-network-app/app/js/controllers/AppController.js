"use strict";

app.controller('AppController', function($scope, $location, authenticationService, notificationService){
	
	// Put the authenticationService in the $scope to make it accessible from all screens
        $scope.authenticationService = authenticationService;

        $scope.logout = function() {
            authenticationService.logout();
            notificationService.showInfo("Logout successful");
            $location.path('/');
        };
});