angular
.module('mainApp')
.controller('profileController', function($scope, $auth, Account, $localStorage) {

	$scope.loadProfile = function() {
		$scope.localdisplayName = $localStorage.localdisplayName;
		$scope.localtagline = $localStorage.localtagline;
		$scope.localimgUrl = $localStorage.localimgUrl;
	};

	$scope.loadProfile();
});
