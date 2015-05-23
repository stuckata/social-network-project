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
			console.log(error);
		}
		);
});