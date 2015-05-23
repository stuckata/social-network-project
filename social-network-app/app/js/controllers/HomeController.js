"use strict";

app.controller('HomeController', function ($scope, $rootScope, $location, $routeParams, authenticationService, notificationService, userService, postsService, profileService, commentsService) {

	if (!authenticationService.isLoggedIn()) {
		$location.path("/");
		notificationService.showInfo("You must login to proceed!");
	}

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
	userService.fetchWall(currentUser, "", 3,
		function success(data) {
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
			$scope.showNewPost = !$scope.showNewPost;
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
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

	$scope.approveRequest = function (requestId) {
		profileService.acceptRequest(requestId,
			function success(data) {
				$scope.friends.unshift(data);
				$scope.showNewRequests = !$scope.showNewRequests;
				notificationService.showInfo("Congrats! You have a new friend!");
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
				$scope.showNewRequests = !$scope.showNewRequests;
				notificationService.showInfo("You lost a friend successfuly!");
			},
			function error(error) {
				notificationService.showError("Problem when rejecting request", error);
				console.log(error);
			}
			);
	};

	$scope.user = JSON.parse(sessionStorage['currentUserInfo']);
	$scope.updateUser = function (user) {
		console.log(user);
		profileService.updateUser(user,
			function success(data) {
				console.log(data);
				$scope.showSettings = !$scope.showSettings;
				sessionStorage['currentUserInfo'] = JSON.stringify(data);
				notificationService.showInfo("User data updated successfuly!");
			
			},
			function error(error) {
				notificationService.showError("Problem when updating user data", error);
				console.log(error);
			}
			);
	};

	$scope.passwordChange = function (userPass) {
		console.log(userPass);
		profileService.changePassword(userPass,
			function success(data) {
				$scope.showPasswordChange = !$scope.showPasswordChange;
				notificationService.showInfo("User password updated successfuly!");
			},
			function error(error) {
				notificationService.showError("Problem when updating user password", error);
				console.log(error);
			}
			);
	};

	$scope.coverImageSelected = function (fileInputField) {
		var file = fileInputField.files[0];
		console.log(file);
		if (file.type.match(/image\/.*/)) {
			var reader = new FileReader();
			reader.onload = function () {
				$scope.user.coverImageData = reader.result;
				$(".image-box1").html("<img src='" + reader.result + "'>");
			};
			reader.readAsDataURL(file);
		} else {
			$(".image-box1").html("<p>File type not supported!</p>");
		}
	};

	$scope.profileImageSelected = function (fileInputField) {
		var file = fileInputField.files[0];
		console.log(file);
		if (file.type.match(/image\/.*/)) {
			var reader = new FileReader();
			reader.onload = function () {
				$scope.user.profileImageData = reader.result;
				$(".image-box2").html("<img src='" + reader.result + "'>");
			};
			reader.readAsDataURL(file);
		} else {
			$(".image-box2").html("<p>File type not supported!</p>");
		}
	};
	
	var comment = {};
	$scope.postComment = function (post, commentContent , message) {
		comment.CommentContent = commentContent;
		commentsService.postCommnent(post.id, comment, function success(data) {
			post.comments.push(data);
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
	};

});