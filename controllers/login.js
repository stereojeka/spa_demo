angular
.module('mainApp')
.controller('loginController', function($scope, $location, $localStorage){
	$localStorage.loggedIn = false;
	$scope.submit = function(){
		if($scope.username == 'admin' && $scope.password == 'admin'){
			$localStorage.loggedIn = true;
			$location.path('/editprofile');
		} else {
			alert('Wrong stuff!');
		}
	};
});