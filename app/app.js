var app = angular.module('mainApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/home',
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/home.tpl.html'
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
