'use strict';

app.factory('postsService', function ($http, baseServiceUrl, authenticationService) {

	function fetchPosts(userData, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'posts',
			headers: authenticationService.getAuthorizationHeaders(),
			data: userData
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function fetchPost(postId, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'posts/' + postId,
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function fetchPostLikes(postId, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'posts/' + postId + "/likes",
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function previewPostLikes(postId, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'posts/' + postId + "/likes/preview",
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function publishPostLikes(postId, success, error) {
		var request = {
			method: 'POST',
			url: baseServiceUrl + 'posts/' + postId + "/likes",
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}
	
	function deletePostLikes(postId, success, error) {
		var request = {
			method: 'DELETE',
			url: baseServiceUrl + 'posts/' + postId + "/likes",
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function deletePost(postId, success, error) {
		var request = {
			method: 'DELETE',
			url: baseServiceUrl + 'posts/' + postId,
			headers: authenticationService.getAuthorizationHeaders()
		};
		$http(request)
			.success(function (data) {
				success(data);
			})
			.error(error);
	}

	function publishPost(post, success, error) {
		var request = {
			method: 'POST',
			url: baseServiceUrl + 'posts',
			headers: authenticationService.getAuthorizationHeaders(),
			data: post
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	return {
		fetchPosts: fetchPosts,
		fetchPost: fetchPost,
		fetchPostLikes: fetchPostLikes,
		previewPostLikes: previewPostLikes,
		publishPostLikes: publishPostLikes,
		deletePostLikes: deletePostLikes,
		deletePost: deletePost,
		publishPost: publishPost
	};
});