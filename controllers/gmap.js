angular
.module('mainApp')
.controller('gmapController', function($scope, $http) {

	$scope.goMap = false;

	$scope.showhideMap = function(){
		return !$scope.goMap;
	}

	

});