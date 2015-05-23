"use strict";

app.controller('AppController', function ($scope, $location, authenticationService, notificationService, userService) {

	$scope.authenticationService = authenticationService;

	$scope.logout = function () {
		authenticationService.logout();
		notificationService.showInfo("Logout successful");
		$location.path('/');
	};

	$scope.openUserProfile = function (selectedUser) {
		userService.preview(selectedUser, function success(data) {
			sessionStorage['selectedUser'] = JSON.stringify(data);
			$location.path("/user-profile");
		},
			function error(error) {
				console.log(error);
			});
	};

});