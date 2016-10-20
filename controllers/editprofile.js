angular
.module('mainApp')
.controller('editProfileController', function($scope, $auth, Account, $localStorage) {

	$scope.getProfile = function() {
		if($localStorage.accessToken == null){
			$localStorage.localdisplayName = $scope.userName;
			$localStorage.localtagline = $scope.userStatus;
		}else{
			Account.getProfile()
			.then(function(response) {
				$scope.user = response.data;
				$localStorage.localdisplayName = $scope.user.displayName;
				$localStorage.localtagline = $scope.user.displayName;
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
			$scope.userStatus = $localStorage.localtagline;
		}else{
			$localStorage.localdisplayName = $scope.user.displayName;
			$localStorage.localtagline = $scope.user.localtagline;
			$localStorage.localimgUrl = $scope.user.image.url;
		}	
	};

	$scope.getProfile();
});