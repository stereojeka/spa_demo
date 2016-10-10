var app = angular.module("mainApp", ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		temlplateUrl: 'pages/login.html'
	})
	.when('/login', {
		temlplateUrl: 'pages/login.html'
	})
	.when('/home', {
		temlplateUrl: 'pages/home.html'
	})
	.otherwise({
		redirectTo: 'pages/login.html'
	});
});

app.controller('loginController', function($scope, $location){
	$scope.submit = function(){
		if($scope.username == 'admin' && $scope.password == 'admin'){
			$location.path('/home');
		}
	};
});