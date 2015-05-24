"use strict";

app.controller('HomeController', function ($modal, $scope, $rootScope, $location, $routeParams, authenticationService, notificationService, userService, postsService, profileService, commentsService) {

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

	userService.fetchMyWall("", 10,
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
			post.comments.push(data);
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
	};



	$scope.animationsEnabled = false;
	$scope.currentUserInfo = JSON.parse(sessionStorage['currentUserInfo']);
	$scope.username = $scope.currentUserInfo.username;

	$scope.openDialog = function (size, templateUrl) {
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

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, postsService, notificationService, profileService, username, wall, requests, friends, user) {

	$scope.username = username;
	$scope.wall = wall;
	$scope.requests = requests;
	$scope.friends = friends;
	$scope.user = user;

	var post = {};
	$scope.postMessage = function (message) {

		post.username = $scope.username;
		post.postContent = message;

		postsService.publishPost(post, function success(data) {
			$scope.wall.unshift(data);
			$modalInstance.dismiss('cancel');
		},
			function error(error) {
				notificationService.showError("Problem while posting the message", error);
				console.log(error);
			});
	};

	$scope.approveRequest = function (requestId, index) {
		profileService.acceptRequest(requestId,
			function success(data) {
				$scope.friends.unshift(data);
				$scope.requests.splice(index, 1);
				notificationService.showInfo("Congrats! You have a new friend!");
			},
			function error(error) {
				notificationService.showError("Problem when approving request", error);
				console.log(error);
			}
			);
	};

	$scope.rejectRequest = function (requestId, index) {
		profileService.rejectRequest(requestId,
			function success(data) {
				$scope.friends.unshift(data);
				$scope.requests.splice(index, 1);
				notificationService.showInfo("You lost a friend successfuly!");
			},
			function error(error) {
				notificationService.showError("Problem when rejecting request", error);
				console.log(error);
			}
			);
	};


	$scope.updateUser = function (user) {
		console.log(user);
		profileService.updateUser(user,
			function success(data) {
				notificationService.showInfo("User data updated successfuly!");
				$modalInstance.dismiss('cancel');
			},
			function error(error) {
				notificationService.showError("Problem when updating user data", error);
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

	$scope.passwordChange = function (userPass) {
		profileService.changePassword(userPass,
			function success(data) {
				$modalInstance.dismiss('cancel');
				notificationService.showInfo("User password updated successfuly!");
			},
			function error(error) {
				notificationService.showError("Problem when updating user password", error);
				console.log(error);
			}
			);
	};


	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});