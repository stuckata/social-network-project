"use strict";

app.controller('LoginController', ['$scope', '$location', '$timeout', 'userData', function ($scope, $location, $timeout, userData) {
	
	$scope.login = function (user) {
		userData.login(user)
			.$promise
			.then(function (data) {
				$location.path('/home');
			});	
	};
}]);