angular
.module('mainApp')
.factory('Account', function($http, $localStorage) {
	return {
		getProfile: function() {
			return $http.get('https://www.googleapis.com/plus/v1/people/me');
		}
	};
});