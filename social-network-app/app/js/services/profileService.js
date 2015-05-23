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

	return {
		fetchRequests: fetchRequests,
		acceptRequest: acceptRequest,
		rejectRequest: rejectRequest,
		sendRequest: sendRequest
	};
});