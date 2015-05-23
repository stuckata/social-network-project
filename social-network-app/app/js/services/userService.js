'use strict';

app.factory('userService', function ($http, baseServiceUrl, authenticationService) {
	
	//Връща данни за логнатия потребител
	function getMyInfo(success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'me',
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {
			sessionStorage['currentUserInfo'] = JSON.stringify(data);
			success(data);
		})
			.error(error);
	}
	
	//Връща данни за потребител по потребителско име
	//TODO да се подава unername: friendUsername, а не текущия
	function getUserInfo(userData, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'users/' + userData.userName,
			headers: authenticationService.getAuthorizationHeaders(),
			data: userData
        };
        $http(request)
			.success(function (data) {
			sessionStorage['userInfo'] = JSON.stringify(data);
			success(data);
		})
			.error(error);
	}
	
	//Връща данни за потребител по потребителско име
	//TODO да се подава unername: friendUsername, а не текущия
	function search(searchTerm, success, error) {
		console.log(searchTerm);
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'users/search?searchTerm=' + searchTerm,
			headers: authenticationService.getAuthorizationHeaders()
        };
        $http(request)
			.success(function (data) {
			console.log(data);
			success(data);
		})
			.error(error);
	}

	function preview(userData, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'users/' + userData.username + "/preview",
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function fetchFriends(username, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'users/' + username + "/friends",
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}


	function fetchMyFriends(success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'me/friends',
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {
			success(data);
		})
			.error(error);
	}

	function fetchWall(userData, startPostId, pagesize, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'users/' + userData.username + "/wall?StartPostId=" + startPostId + "&PageSize=" + pagesize,
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	function fetchMyWall(startPostId, pagesize, success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'me/feed?StartPostId=' + startPostId + '&PageSize=' + pagesize,
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	return {
		getMyInfo: getMyInfo,
		getUserInfo: getUserInfo,
		search: search,
		preview: preview,
		fetchFriends: fetchFriends,
		fetchWall: fetchWall,
		fetchMyFriends: fetchMyFriends,
		fetchMyWall: fetchMyWall
	};
});