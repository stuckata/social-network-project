'use strict';

app.factory('commentsService', function ($http, baseServiceUrl, authenticationService) {

	function fetchPostCommnents(postId, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'posts/' + postId + "/comments",
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}
	
	function fetchCommnentLikes(postId, commentId, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'posts/' + postId + "/comments/" + commentId + "/likes",
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	return {
		fetchPostCommnents: fetchPostCommnents,
		fetchCommnentLikes: fetchCommnentLikes
	};
});