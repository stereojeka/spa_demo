var app = angular.module('mainApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.tpl.html'
    })
    .state('secret', {
      url: '/secret',
      templateUrl: 'partials/secret.tpl.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.tpl.html'
    });
  $urlRouterProvider.otherwise('/home');

});

app.controller('loginController', function($scope, $location){
	$scope.submit = function(){
		if($scope.username == 'admin' && $scope.password == 'admin'){
			$location.path('/home');
		}
	};
});
