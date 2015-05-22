"use strict";

app.controller('HomeController', function ($scope, $location, authenticationService, notificationService, userService) {

	if (!authenticationService.isLoggedIn()) {
		$location.path("/");
		notificationService.showInfo("You must login to proceed!");
	}


	userService.getUserInfo(
			function success(data) {
				$scope.userInfo = data;
			},
			function error(error) {
				console.log(error);
			}
	);

	console.log($scope.userInfo.name);
	$scope.getFriends = function () {
		$location.path("/friends");
	};
});