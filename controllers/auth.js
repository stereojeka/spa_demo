angular
.module('mainApp')
.controller('authController', function($scope, $auth, $location, $localStorage, Account){

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		.then(function() {
			console.log('You have successfully signed in with ' + provider + '!');
			$localStorage.loggedIn = true;
			$localStorage.accessToken = $auth.getToken();
			$location.path('/editprofile');
			console.log($auth.isAuthenticated());
		})
		.catch(function(error) {
			if (error.error) {
	            // Popup error - invalid redirect_uri, pressed cancel button, etc.
	            console.log(error.error);
	        } else if (error.data) {
	            // HTTP response error from server
	            console.log(error.data.message, error.status);
	        } else {
	        	console.log(error);
	        }
	    });
	};

});