var app = angular.module('mainApp', ['ui.router', 'satellizer']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
	$authProvider.facebook({
		clientId: '1336322916420295',
		responseType: 'token',
		name: 'facebook',
		url: '/auth/facebook',
		authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
		redirectUri: window.location.origin + '/spa_demo/#/',
		requiredUrlParams: ['display', 'scope'],
		scope: ['email'],
		scopeDelimiter: ',',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 580, height: 400 }
	});

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'partials/home.tpl.html'
	})
	.state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
    })
	.state('profile', {
		url: '/profile',
		resolve: {
			skipIfLoggedIn: skipIfLoggedIn
		},
		templateUrl: 'partials/profile.tpl.html'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'partials/login.tpl.html'
	});
	$urlRouterProvider.otherwise('/home');

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
			$location.path('/home');
		} else {
			alert('Wrong stuff!');
		}
	};
});

app.controller('authController', function($scope, $auth){

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider);
	};

});