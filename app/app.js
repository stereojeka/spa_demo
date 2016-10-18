var app = angular.module('mainApp', ['ui.router', 'satellizer', 'ngResource', 'ngStorage']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'partials/home.tpl.html'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'partials/profile.tpl.html',
		resolve: {
			"check": function($location, $localStorage){
				if(!$localStorage.loggedIn){
					$location.path('/home');
				} 
			}
		}
	})
	.state('editprofile', {
		url: '/editprofile',
		templateUrl: 'partials/editprofile.tpl.html',
		resolve: {
			"check": function($location, $localStorage){
				if(!$localStorage.loggedIn){
					$location.path('/home');
				} 
			}
		}
	})
	.state('logout', {
		url: '/logout',
		template: null,
		controller: 'logoutController'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'partials/login.tpl.html'
	});
	$urlRouterProvider.otherwise('/home');

	// Google
	$authProvider.google({
		clientId: '877900933221-t16rni758d1f9blqamfppeeqm1t4abo2.apps.googleusercontent.com',
		responseType: 'token',
		url: '/auth/google',
		authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
		redirectUri: window.location.origin + '/spa_demo/',
		requiredUrlParams: ['scope'],
		optionalUrlParams: ['display'],
		scope: ['profile', 'email'],
		scopePrefix: 'openid',
		scopeDelimiter: ' ',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 452, height: 633 }
	});

});

app.controller('loginController', function($scope, $location, $localStorage){
	$localStorage.loggedIn = false;
	$scope.submit = function(){
		if($scope.username == 'admin' && $scope.password == 'admin'){
			$localStorage.loggedIn = true;
			$location.path('/profile');
		} else {
			alert('Wrong stuff!');
		}
	};
});

app.controller('authController', function($scope, $auth, $location, $localStorage, Account){

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		.then(function() {
			console.log('You have successfully signed in with ' + provider + '!');
			$localStorage.loggedIn = true;
			$localStorage.accessToken = $auth.getToken();
			$location.path('/profile');
			console.log($localStorage.accessToken);
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

app.controller('menuController', function($scope, $localStorage) {
	$scope.isLoggedIn = function() {
		return $localStorage.loggedIn;
	};
});


app.controller('logoutController', function($location, $localStorage) {
	if($localStorage.accessToken == null){
	}else{
		$auth.removeToken();
		$localStorage.accessToken = null;
	}
	if($localStorage.loggedIn){
		$localStorage.loggedIn = false;
		$location.path('/login');
	}else{
		return;
	}
	
});

app.controller('profileController', function($scope, $auth, Account, $localStorage, $location) {

	$scope.getProfile = function() {
		Account.getProfile()
		.then(function(response) {
			$localStorage.displayName = $scope.user.displayName;
			$localStorage.tagline = $scope.user.tagline;
			$localStorage.imgUrl = $scope.user.image.url;
			$scope.user = response.data;
			console.log($scope.user);
		})
		.catch(function(response) {
			console.log(response.data.message, response.status);
		});
	};

	$scope.updateProfile = function() {
		$localStorage.displayName = $scope.user.displayName;
		$localStorage.tagline = $scope.user.tagline;
		$localStorage.imgUrl = $scope.user.image.url;
		location.path('/profile');
	};

	$scope.getProfile();
});

app.factory('Account', function($http, $localStorage) {
	return {
		getProfile: function() {
			return $http.get('https://www.googleapis.com/plus/v1/people/me');
		}
	};
});