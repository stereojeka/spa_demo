var app = angular.module('mainApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
    });
  $urlRouterProvider.otherwise('/login');

});
/*
app.controller('loginController', function($scope, $location){
	$scope.submit = function(){
		if($scope.username == 'admin' && $scope.password == 'admin'){
			$location.path('/home');
		}
	};
});

*/