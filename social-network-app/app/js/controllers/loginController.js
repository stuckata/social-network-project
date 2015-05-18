"use strict";

app.controller('LoginController', function ($scope, $location, userData) {
	
	$scope.login = function (user) {
		userData.login(user)
			.success(function (data) {
				$location.path('/home');
			})
			.error(function (data, error) {
				
			});
	};
});