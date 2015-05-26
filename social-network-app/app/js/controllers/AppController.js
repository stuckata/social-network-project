"use strict";

app.controller('AppController', function ($modal, $scope, $location, authenticationService, notificationService, userService, profileService, commentsService) {

	$scope.authenticationService = authenticationService;

	$scope.logout = function () {
		authenticationService.logout();
		notificationService.showInfo("Logout successful");
		$location.path('/');
	};
});