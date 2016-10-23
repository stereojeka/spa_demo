angular
.module('mainApp')
.controller('gmapController', function($scope, $localStorage) {

	$localStorage.goMap = false;

	$scope.showhideMap = function(){
		$localStorage.goMap = !$localStorage.goMap;
	}

	

});