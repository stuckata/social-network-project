'use strict';

app.factory('profileService', function ($http, baseServiceUrl, authenticationService) {


	function fetchRequests(success, error) {
		var request = {
			method: 'GET',
			url: baseServiceUrl + 'me/requests',
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	function acceptRequest(requestId, success, error) {
		var request = {
			method: 'PUT',
			url: baseServiceUrl + 'me/requests/' + requestId + "?status=approved",
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	function rejectRequest(requestId, success, error) {
		var request = {
			method: 'PUT',
			url: baseServiceUrl + 'me/requests/' + requestId + "?status=rejected",
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	function sendRequest(requestedUsername, success, error) {
		var request = {
			method: 'POST',
			url: baseServiceUrl + 'me/requests/' + requestedUsername,
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	function updateUser(user, success, error) {
		var request = {
			method: 'PUT',
			url: baseServiceUrl + 'me',
			headers: authenticationService.getAuthorizationHeaders(),
			data: user
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}
	
	function changePassword(userPass, success, error) {
		var request = {
			method: 'PUT',
			url: baseServiceUrl + 'me/ChangePassword',
			headers: authenticationService.getAuthorizationHeaders(),
			data: userPass
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	return {
		fetchRequests: fetchRequests,
		acceptRequest: acceptRequest,
		rejectRequest: rejectRequest,
		sendRequest: sendRequest,
		updateUser: updateUser,
		changePassword: changePassword
	};
});