"use strict";

app.controller('FriendsController', function ($modal, $scope, $location, authenticationService, userService, profileService, commentsService, notificationService, postsService) {

	$scope.limitFriends = 5;

	if (!authenticationService.isLoggedIn()) {
		$location.path("/");
		notificationService.showInfo("You must login to proceed!");
	}
	
	userService.fetchMyFriends(
		function success(data) {
			$scope.friends = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching current user friends", error);
			console.log(error);
		}
		);

	userService.fetchMyWall("", 10,
		function success(data) {
			$scope.wall = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching current user wall posts", error);
			console.log(error);
		}
		);

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

	$scope.openUserProfile = function (selectedUser) {
		userService.preview(selectedUser, function success(data) {
			console.log(data);
			$scope.currentUserInfo = JSON.parse(sessionStorage['currentUserInfo']);
			sessionStorage['selectedUser'] = JSON.stringify(data);
			if ($scope.currentUserInfo.id == data.id) {
				$location.path("/home");
			} else {
				$location.path("/user-profile");
			}

		},
			function error(error) {
				notificationService.showError("Navigation to selected profile failed", error);
				console.log(error);
			});
	};

	userService.getMyInfo(
		function success(data) {
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

	$scope.getFriends = function () {
		$location.path("/friends");
	};

	profileService.fetchRequests(
		function success(data) {
			$scope.requests = data;
		},
		function error(error) {
			notificationService.showError("Problem while fetching friend requests", error);
			console.log(error);
		}
		);

	var comment = {};
	$scope.postComment = function (post, commentContent, message) {
		comment.CommentContent = commentContent;
		commentsService.postCommnent(post.id, comment, function success(data) {
			post.comments.unshift(data);
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
	};


	$scope.animationsEnabled = false;
	$scope.openDialog = function (size, templateUrl) {
		$scope.currentUserInfo = JSON.parse(sessionStorage['currentUserInfo']);
		$scope.username = $scope.currentUserInfo.username;
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: templateUrl,
			controller: 'ModalInstanceCtrl',
			size: size,
			resolve: {
				username: function () {
					return $scope.username;
				},
				wall: function () {
					return $scope.wall;
				},
				requests: function () {
					return $scope.requests;
				},
				friends: function () {
					return $scope.friends;
				},
				user: function () {
					return $scope.currentUserInfo;
				}
			}
		});

		modalInstance.result.then(function () {
		}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});
	};

});