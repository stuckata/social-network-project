"use strict";

var app = angular.module('SocialNetworkApp', ['ngRoute', 'ngResource', 'LocalStorageModule', 'notyModule']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		});
});