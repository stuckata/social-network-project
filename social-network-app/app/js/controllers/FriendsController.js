"use strict";

app.controller('FriendsController', function($scope, $location, authenticationService, notificationService, postsService){

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