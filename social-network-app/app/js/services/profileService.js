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

	function acceptRequest(reqiestId, success, error) {
		var request = {
			method: 'PUT',
			url: baseServiceUrl + 'me/requests/' + reqiestId + "?status=approved",
			headers: authenticationService.getAuthorizationHeaders(),
        };
        $http(request)
			.success(function (data) {

			success(data);
		})
			.error(error);
	}

	function rejectRequest(reqiestId, success, error) {
		var request = {
			method: 'PUT',
			url: baseServiceUrl + 'me/requests/' + reqiestId + "?status=rejected",
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
		rejectRequest: rejectRequest
	};
});