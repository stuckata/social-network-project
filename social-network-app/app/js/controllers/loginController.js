"use strict";

app.controller('LoginController', ['$scope', '$location', '$timeout', 'userData', function ($scope, $location, $timeout, userData) {
	
	$scope.login = function (user) {
		userData.login(user)
			.success(function (data, $scope) {
				$scope.alert.type = 'success';
				$scope.alert.status = 'Login successful!';
				$scope.alert.message = user.username + 'is logged!';
				$timeout(function () {$scope.alertShow = !$scope.alertShow;}, 3000);
				$location.path('/home');
			})
			.error(function (data, error, $scope) {
				$scope.alert.type = 'danger';
				$scope.alert.status = 'Login failed!';
				$scope.alert.message = error;
			});
	};
}]);