angular
.module('mainApp')
.controller('logoutController', function($location, $localStorage) {
	if($localStorage.loggedIn){
		$localStorage.loggedIn = false;
		window.localStorage.clear();
		$location.path('/login');
	}	
});