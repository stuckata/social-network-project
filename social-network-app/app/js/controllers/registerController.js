"use strict";

app.controller('RegisterController', ['$scope', '$location', '$timeout', 'userData', 
	function ($scope, $location, $timeout, userData) {
	
	$scope.register = function (user) {
		
		userData.register(user)
			.$promise
			.then(function (data) {
				$location.path('/home');
			},
			function (error) {
				
				$scope.registerError = error.modelState.model;
				$scope.RegisterFailedAlert = !$scope.RegisterFailedAlert;
			});
	};
}]);