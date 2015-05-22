'use strict';

app.factory('userService', function($http, baseServiceUrl, authenticationService) {
	
	
	function getUserInfo(userInfo, success, error) {
		var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'users/qscs',
					headers: authenticationService.getAuthorizationHeaders(),
                    data: userInfo
        };
        $http(request)
			.success(function(data) {
	        	sessionStorage['currentUserInfo'] = JSON.stringify(data);
	            success(data);
			})
			.error(error);
	}
	
	return {
		getUserInfo: getUserInfo
	};
});