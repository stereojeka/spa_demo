angular.module('mainApp', ['ui.router', 'satellizer', 'ngResource', 'ngStorage'])
.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
	$stateProvider
	.state('home', {
		url: '/home',
		controller: 'HomeCtrl',
		templateUrl: 'partials/home.tpl.html'
	})
	.state('profile', {
		url: '/profile',
		controller: 'ProfileCtrl',
		templateUrl: 'partials/profile.tpl.html'
	})
	.state('logout', {
		url: '/logout',
		template: null,
		controller: 'LogoutCtrl'
	})
	.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'partials/login.tpl.html'
					/*
					resolve: {
						skipIfLoggedIn: skipIfLoggedIn
					}
					*/
				});
	$urlRouterProvider.otherwise('/home');

				// Facebook
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
