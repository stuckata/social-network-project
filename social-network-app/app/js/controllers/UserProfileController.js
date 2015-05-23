"use strict";

app.controller('UserProfileController', function($scope, $location, authenticationService, notificationService, userService){

	$scope.selectedUser = JSON.parse(sessionStorage['selectedUser']);		
	console.log($scope.selectedUser);
});