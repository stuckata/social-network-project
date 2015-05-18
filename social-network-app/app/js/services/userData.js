"use strict";

app.factory('userData', ['$resource', 'authentication', 'baseServiceUrl' ,function ($resource, authentication, baseServiceUrl) {

	function registerUser(user) {

		return $resource(baseServiceUrl + 'users/Register')
			.save(user)
			.$promise
			.then(function (data) {
				authentication.saveUser(data);
		});
	}

	function loginUser(user) {

		var resource = $resource(baseServiceUrl + 'users/Login').save(user);
		
		resource.$promise
			.then(function (data) {
				authentication.saveUser(data);
		});

		return resource;
	}

	function logoutUser(user) {

		return $resource(baseServiceUrl + 'users/Logout')
			.save(user)
			.$promise
			.then(function (data) {
				authentication.removeUser(user);
		});
	}

	return {
		register: registerUser,
		login: loginUser,
		logout: logoutUser
	};
}]);