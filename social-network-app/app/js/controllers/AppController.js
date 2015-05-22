"use strict";

app.controller('AppController', function($scope, $location, authenticationService, notificationService){

        $scope.authenticationService = authenticationService;

        $scope.logout = function() {
            authenticationService.logout();
            notificationService.showInfo("Logout successful");
            $location.path('/');
        };
});