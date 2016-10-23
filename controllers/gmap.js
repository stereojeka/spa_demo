angular
.module('mainApp')
.controller('gmapController', function($scope, Account) {

	Account.initMap();

	$scope.searchFood = function() {
		Account.requestSearsh();
	}

});