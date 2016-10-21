angular
.module('mainApp')
.controller('editProfileController', function($scope, $auth, Account, $localStorage) {

	$scope.getProfile = function() {
		if($localStorage.accessToken == null){
			$localStorage.localdisplayName = $scope.userName + '(' + $scope.userStatus + ')';
		}else{
			Account.getProfile()
			.then(function(response) {
				$scope.user = response.data;
				$localStorage.localdisplayName = $scope.user.displayName + '(' + $scope.user.localtagline + ')';
				$localStorage.localimgUrl = $scope.user.image.url;
			})
			.catch(function(response) {
				console.log(response.data.message, response.status);
			});
		}

	};

	$scope.updateProfile = function() {
		if($localStorage.accessToken == null){
			$scope.userName = $localStorage.localdisplayName;
		}else{
			$localStorage.localdisplayName = $scope.user.displayName + '(' + $scope.user.localtagline + ')';
			$localStorage.localimgUrl = $scope.user.image.url;
		}	
	};

	$scope.getProfile();
});