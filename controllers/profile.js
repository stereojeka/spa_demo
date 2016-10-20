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

app.factory('Account', function($http, $localStorage) {
	return {
		getProfile: function() {
			return $http.get('https://www.googleapis.com/plus/v1/people/me');
		}
	};
});