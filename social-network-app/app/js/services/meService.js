'use strict';

app.factory('meService', function ($http, baseServiceUrl, authenticationService) {


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

	return {
		fetchRequests: fetchRequests
	};
});