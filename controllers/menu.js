angular
.module('mainApp')
.controller('menuController', function($scope, $localStorage) {
	$scope.isLoggedIn = function() {
		return $localStorage.loggedIn;
	};
});