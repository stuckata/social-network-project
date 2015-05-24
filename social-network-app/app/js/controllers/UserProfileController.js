"use strict";

app.controller('UserProfileController', function ($scope, $location, authenticationService, notificationService, userService, postsService, profileService) {

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

	if ($scope.selectedUser.isFriend) {
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

	}


	$scope.sendFriendRequest = function (username) {
		profileService.sendRequest(username,
			function success(data) {
				notificationService.showInfo("Request sent successfuly!");
			},
			function error(error) {
				notificationService.showError("Problem while fetching user's friends", error);
				console.log(error);
			}
			);
	};
	
	var post = {};
	$scope.postMessage = function (username, message) {

		post.username = username;
		post.postContent = message;

		postsService.publishPost(post, function success(data) {
			$scope.wall.unshift(data);
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
	};
});