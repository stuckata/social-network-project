"use strict";

app.controller('UserProfileController', function ($scope, $location, authenticationService, notificationService, userService, postsService, commentsService) {

	$scope.selectedUser = JSON.parse(sessionStorage['selectedUser']);
	console.log($scope.selectedUser);

	userService.fetchWall($scope.selectedUser, "", 5,
		function success(data) {
			console.log(data);
			$scope.wall = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching user's wall posts", error);
			console.log(error);
		}
		);

	userService.fetchFriends($scope.selectedUser.username,
		function success(data) {
			console.log(data);
			$scope.friends = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching user's friends", error);
			console.log(error);
		}
		);
});