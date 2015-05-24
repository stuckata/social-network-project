"use strict";

var app = angular.module('SocialNetworkApp', ['ngRoute', 'ngResource', 'LocalStorageModule', 'ui.bootstrap']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController'
	})
		.when('/register', {
		templateUrl: 'partials/register.html',
		controller: 'RegisterController'
	})
		.when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	})
		.when('/friends', {
		templateUrl: 'partials/home.html',
		controller: 'FriendsController'
	})
		.when('/user-profile', {
		templateUrl: 'partials/user-profile.html',
		controller: 'UserProfileController'
	})
	
	;
});