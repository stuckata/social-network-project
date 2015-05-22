"use strict";

app.controller('HomeController', function($location, authenticationService, notificationService){
	
	if (!authenticationService.isLoggedIn()) {
		$location.path("/login");
	}
	
	var user = authenticationService.getCurrentUser();
});