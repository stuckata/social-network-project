"use strict";

app.controller('HomeController', function ($scope, $location, authenticationService, notificationService, userService) {

	if (!authenticationService.isLoggedIn()) {
		$location.path("/");
		notificationService.showInfo("You must login to proceed!");
	}


	userService.getMyInfo(
		function success(data) {
			console.log(data);
			$scope.currentUserInfo = JSON.parse(sessionStorage['currentUserInfo']);
		},
		function error(error) {
			console.log(error);
		}
		);

	$scope.search = function (searchTerm) {
		userService.search(searchTerm, function success(data) {
			$scope.searchResults = data;
		},
			function error(error) {
				console.log(error);
			});
	};

	userService.fetchMyFriends(
		function success(data) {
			$scope.friends = data;
		},
		function error(error) {
			console.log(error);
		}
		);

	userService.fetchMyWall("", 5,
		function success(data) {
			console.log(data);
			$scope.wall = data;
		},
		function error(error) {
			console.log(error);
		}
		);

	$scope.getFriends = function () {
		$location.path("/friends");
	};

});