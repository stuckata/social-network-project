"use strict";

app.factory('userData', function ($resource, baseServiceUrl, authentication) {

	function registerUser(user) {

		return $resource(baseServiceUrl + 'users/Register')
			.save(user)
			.success(function (data) {
				authentication.saveUser(data);
			})
			.error(function (data, error) {

		});
	}

	function loginUser(user) {

		var resource = $resource(baseServiceUrl + 'users/Login')
			.save(user)
			.success(function (data) {
				authentication.saveUser(data);
			})
			.error(function (data, error) {

		});

		return resource;
	}

	function logoutUser(user) {

		return $resource(baseServiceUrl + 'users/Logout')
			.save(user)
			.success(function (data) {
				authentication.removeUser(data);
			})
			.error(function (data, error) {

		});
			

	}

	return {
		register: registerUser,
		login: loginUser,
		logout: logoutUser
	};
});