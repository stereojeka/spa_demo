var app = angular.module('mainApp', [
	'ui.router',
	'satellizer',
	'ngResource',
	'ngStorage',
	'nix.api']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, nixApiProvider) {
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
	.state('food', {
		url: '/food',
		templateUrl: 'partials/food.tpl.html',
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

	// Facebook
	/*
	$authProvider.facebook({
		clientId: '1336322916420295',
		responseType: 'token',
		name: 'facebook',
		url: '/auth/facebook',
		authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
		redirectUri: window.location.origin + '/spa_demo/',
		requiredUrlParams: ['display', 'scope'],
		scope: ['email'],
		scopeDelimiter: ',',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 580, height: 400 }
	});
	*/

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

	nixApiProvider.setApiCredentials('64692575', '119755abced70715fd7a361548a6fabf');

});

app.controller('loginController', function($scope, $location, $localStorage){
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

app.controller('authController', function($scope, $auth, $location, $localStorage, Account){

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
		.then(function() {
			console.log('You have successfully signed in with ' + provider + '!');
			$localStorage.loggedIn = true;
			$localStorage.accessToken = $auth.getToken();
			$location.path('/editprofile');
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
	if($localStorage.loggedIn){
		$localStorage.loggedIn = false;
		window.localStorage.clear();
		$location.path('/login');
	}	
});

app.controller('profileController', function($scope, $auth, Account, $localStorage) {

	$scope.getProfile = function() {
		Account.getProfile()
		.then(function(response) {
			$scope.user = response.data;
			$localStorage.displayName = $scope.user.displayName;
			$localStorage.tagline = $scope.user.tagline;
			$localStorage.imgUrl = $scope.user.image.url;
		})
		.catch(function(response) {
			console.log(response.data.message, response.status);
		});
	};

	$scope.updateProfile = function() {
		$scope.user.displayName = $localStorage.displayName;
		$scope.user.tagline = $localStorage.tagline;
		$scope.user.image.url = $localStorage.imgUrl;
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

app.controller('foodController', function ($scope, $filter, nixApi) {
	$scope.columns = [
	{
		header:     'qty',
		valueField: 'serving_qty'
	},
	{
		header:     'measure',
		valueField: 'serving_unit'
	},
	{
		header:     'food',
		valueField: 'parsed_query.food'
	},
	{
		header:     'Energy',
		getValue:   function (estimation) {
			var result;
			if (estimation.nutrients) {
				result = $filter('nutrient')(estimation.nutrients, 208);
				if (result) {
					return $filter('number')(result.value, 2).toString() + ' ' + result.unit;
				}
			}
		},
		getSummary: function () {
			var result;
			if ($scope.apiResponse && $scope.apiResponse.total) {
				result = $filter('nutrient')($scope.apiResponse.total.nutrients, 208);
				if (result) {
					return $filter('number')(result.value, 2).toString() + ' ' + result.unit;
				}
			}
		}
	},
	{
		header:     'NDB number',
		valueField: 'ndb_no'
	}
	];

	$scope.data = '';
	$scope.apiResponse = null;

	$scope.estimate = function estimate() {
		localStorage.clear();
		estimate.error = null;
		$scope.apiResponse = null;
		nixApi.natural($scope.data)
		.success(function (apiResponse) {
			$scope.apiResponse = apiResponse;
		})
		.error(function (error) {
			estimate.error = error;
		});
	};

	$scope.getProperty = function (object, property) {
		var current = object, keys = property.split('.'), i;
		for (i = 0; i < keys.length; i += 1) {
			if (current[keys[i]]) {
				current = current[keys[i]];
			} else {
				current = null;
				break;
			}
		}

		return current;
	};
});