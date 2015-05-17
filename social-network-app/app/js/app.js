"use strict";

var app = angular.module('SocialNetworkApp', ['ngRoute']);

app.constant = ('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		});
});