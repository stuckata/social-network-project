"use strict";

app.controller('HomeController', function ($scope, $location, authenticationService, notificationService, userService, postsService, meService) {

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

	// тук трябва да се вика me/feed обаче не връща верен резултат!!!
	var currentUser = JSON.parse(sessionStorage['currentUserInfo']);
	userService.fetchWall(currentUser, "", 10,
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

	var post = {};
	$scope.postMessage = function (username, message) {
		post.username = username;
		post.postContent = message;

		postsService.publishPost(post, function success(data) {
			$scope.wall.unshift(data);
			console.log(data);
		},
			function error(error) {
				console.log(error);
			});
	};

	meService.fetchRequests(
		function success(data) {
			$scope.requests = data;
			console.log(data);
		},
		function error(error) {
			console.log(error);
		}
		);


});