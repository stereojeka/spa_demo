(function () {
	'use strict';
	angular
	.module('mainApp', [
		'ui.router',
		'satellizer',
		'ngResource',
		'ngStorage',
		'nix.api'])
	.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, nixApiProvider) {
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

})();