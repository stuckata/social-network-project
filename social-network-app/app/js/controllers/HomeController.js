"use strict";

app.controller('HomeController', function ($scope, $location, authenticationService, notificationService, userService) {

	if (!authenticationService.isLoggedIn()) {
		$location.path("/");
		notificationService.showInfo("You must login to proceed!");
	}

	userService.getMyInfo(
		function success(data) {
			console.log(data);
			$scope.currentUserInfo = JSON.parse(sessionStorage['currentUserInfo']);//TODO
		},
		function error(error) {
			console.log(error);
		}
		);

	$scope.getFriends = function () {
		$location.path("/friends");
	};

	$scope.search = function (searchTerm) {
		userService.search(searchTerm, function success(data) {
			$scope.searchResults = data;
		},
			function error(error) {
				console.log(error);
			});
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