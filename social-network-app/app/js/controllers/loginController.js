"use strict";

app.controller('LoginController', ['$scope', '$location', '$timeout', 'userData', 'notyModule', 'notification', 
	function ($scope, $location, $timeout, userData, notyModule, notification) {

	$scope.login = function (user) {
		userData.login(user)
			.$promise
			.then(function (data) {
			$scope.showNotification = function () {
				noty.show('Login successful',"success")
			};
			$location.path('/home');
		});
	};
}]);