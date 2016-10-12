var app = angular.module('mainApp', ['ui.router', 'satellizer', 'ngResource']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
	$authProvider.facebook({
		clientId: '1336322916420295',
		responseType: 'token',
		name: 'facebook',
		url: '/auth/facebook',
		authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
		redirectUri: window.location.origin + '/spa_demo',
		requiredUrlParams: ['display', 'scope'],
		scope: ['email'],
		scopeDelimiter: ',',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 580, height: 400 }
	});

	$authProvider.google({
		clientId: '877900933221-t16rni758d1f9blqamfppeeqm1t4abo2.apps.googleusercontent.com',
		url: '/auth/google',
		authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
		redirectUri: window.location.origin + '/spa_demo',
		requiredUrlParams: ['scope'],
		optionalUrlParams: ['display'],
		scope: ['profile', 'email'],
		scopePrefix: 'openid',
		scopeDelimiter: ' ',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 452, height: 633 }
	});

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'partials/home.tpl.html'
	})
	.state('profile', {
		url: '/profile',
		/*
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				} 
			}
		},
		*/
		templateUrl: 'partials/profile.tpl.html',
	})
	.state('login', {
		url: '/login',
		templateUrl: 'partials/login.tpl.html'
		/*
		resolve: {
			skipIfLoggedIn: skipIfLoggedIn
		}
		*/
	});
	$urlRouterProvider.otherwise('/login');

	function skipIfLoggedIn($q, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}

	function loginRequired($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	}

});

app.controller('loginController', function($scope, $location, $rootScope){
	$scope.submit = function(){

		if($scope.username == 'admin' && $scope.password == 'admin'){
			$rootScope.loggedIn = true;
			$location.path('/profile');
		} else {
			alert('Wrong stuff!');
		}
	};
});

app.controller('authController', function($scope, $auth, $location){

	$scope.login = function() {
		$auth.login($scope.user)
		.then(function() {
			$location.path('/profile');
		})
		.catch(function(error) {
			console.log(error.data.message, error.status);
		});
	};

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		.then(function() {
			$location.path('/profile');
		})
		.catch(function(error) {
			if (error.error) {
				console.log(error.error);
			} else if (error.data) {
				console.log(error.data.message, error.status);
			} else {
				console.log(error);
			}
		});
	};

});

app.controller('menuController', function($scope, $auth) {
	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};
});


app.controller('LogoutCtrl', function($location, $auth) {
	if (!$auth.isAuthenticated()) { return; }
	$auth.logout()
	.then(function() {
		$location.path('/');
	});
});

app.controller('ProfileCtrl', function($scope, $auth, Account) {

	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	$scope.getProfile = function() {
		Account.getProfile()
		.then(function(response) {
			$scope.user = response.data;
		})
		.catch(function(response) {
			console.log(response.data.message, response.status);
		});
	};
	$scope.updateProfile = function() {
		Account.updateProfile($scope.user)
		.then(function() {
			console.log('Profile has been updated');
		})
		.catch(function(response) {
			console.log(response.data.message, response.status);
		});
	};

	$scope.getProfile();
});

app.factory('Account', function($http) {
	return {
		getProfile: function() {
			return $http.get('https://graph.facebook.com/me');
		},
		updateProfile: function(profileData) {
			return $http.put('https://graph.facebook.com/me', profileData);
		}
	};
});