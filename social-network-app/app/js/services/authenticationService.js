"use strict";

app.factory('authenticationService', function($http, baseServiceUrl) {
	
	function login(userData, success, error) {
		
		var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/users/Login',
                    data: userData
        };
        $http(request)
			.success(function(data) {
	        	sessionStorage['currentUser'] = JSON.stringify(data);
	            success(data);
			})
			.error(error);
	};
	
	function register(userData, success, error) {
		
		var request = {
					method: 'POST',
                    url: baseServiceUrl + 'users/Register',
                    data: userData
		};	
		$http(request)
			.success(function(data) {
	        	sessionStorage['currentUser'] = JSON.stringify(data);
	            success(data);
			})
			.error(error);
	};
	
	function logout() {
		
		delete sessionStorage['currentUser'];
	};
	
	function getCurrentUser() {
		
		var user = sessionStorage['currentUser'];
		if (user) {
			return JSON.parse(sessionStorage['currentUser']);
		}
	};
	
	function isLoggedIn() {
		
		return sessionStorage['currentUser'] != undefined;
	};
	
	function getAuthorizationHeaders() {
		
		var headers = {};
        var currentUser = this.getCurrentUser();
        if (currentUser) {
            headers['Authorization'] = 'Bearer ' + currentUser.access_token;
        }
        return headers;
	};
	
	return {
		login: login,
		register: register,
		logout: logout,
		getCurrentUser: getCurrentUser,
		isLoggedIn: isLoggedIn,
		getAuthorizationHeaders: getAuthorizationHeaders
	};
});