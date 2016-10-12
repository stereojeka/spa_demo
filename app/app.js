var app = angular.module('mainApp', ['ui.router', 'satellizer']);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
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

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'partials/home.tpl.html'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'partials/profile.tpl.html'
	})
	.state('secret', {
		url: '/secret',
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				} 
			}
		},
		templateUrl: 'partials/secret.tpl.html'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'partials/login.tpl.html'
	});
	$urlRouterProvider.otherwise('/login');

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

app.controller('authController', function($scope, $auth, $location){

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