"use strict";

app.controller('RegisterController', ['$scope', '$location', 'userData', function ($scope, $location, userData) {
	
	$scope.register = function (user) {
		
		userData.register(user)
			.$promise
			.then(function (data) {
				$location.path('/home');
			});
	};
	
}]);