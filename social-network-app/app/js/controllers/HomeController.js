"use strict";

app.controller('HomeController', function ($scope, $location, authenticationService, notificationService, userService, postsService, profileService) {

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
			 notificationService.showError("Problem while fetching current user data", error);
			console.log(error);
		}
		);

	$scope.search = function (searchTerm) {
		userService.search(searchTerm, function success(data) {
			$scope.searchResults = data;
		},
			function error(error) {
				notificationService.showError("Problem while fetching searched data", error);
				console.log(error);
			});
	};

	userService.fetchMyFriends(
		function success(data) {
			$scope.friends = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching current user friends", error);
			console.log(error);
		}
		);

	// тук трябва да се вика me/feed обаче не връща верен резултат!!!
	var currentUser = JSON.parse(sessionStorage['currentUserInfo']);
	userService.fetchWall(currentUser, "", 10,
		function success(data) {
			console.log(data);
			$scope.wall = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching current user wall posts", error);
			console.log(error);
		}
		);

	$scope.getFriends = function () {
		$location.path("/friends");
	};

	var post = {};
	$scope.postMessage = function (username, message) {
		post.username = username;
		post.postContent = message;

		postsService.publishPost(post, function success(data) {
			$scope.wall.unshift(data);
			console.log(data);
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
	};

	profileService.fetchRequests(
		function success(data) {
			$scope.requests = data;
			console.log(data);
		},
		function error(error) {
			notificationService.showError("Problem while fetching friend requests", error);
			console.log(error);
		}
		);

	$scope.approveRequest = function (requestId) {
		profileService.acceptRequest(requestId,
			function success(data) {
				$scope.friends.unshift(data);
				notificationService.showInfo("Congrats! You have a new friend!");
				console.log(data);
			},
			function error(error) {
				notificationService.showError("Problem when approving request", error);
				console.log(error);
			}
			);
	};

	$scope.rejectRequest = function (requestId) {
		profileService.rejectRequest(requestId,
			function success(data) {
				console.log(data);
				notificationService.showInfo("You lost a friend successfuly!");
			},
			function error(error) {
				notificationService.showError("Problem when rejecting request", error);
				console.log(error);
			}
			);
	};


});