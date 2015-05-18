"use strict";

app.factory('authentication', function () {
	
	var key = 'user';
	
	function saveUserData(data) {
		
		localStorage.setItem(key, angular.toJson(data));
	}
	
	function getUserData() {
		
		return angular.fromJson(localStorage.getItem(key));
	}
	
	function removeUser(key) {
		
		localStorage.removeItem(key);
	}
	
	return {
		saveUser: saveUserData,
		getUser: getUserData,
		removeUser: removeUser
	};
});