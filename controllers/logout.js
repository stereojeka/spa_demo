angular.module('mainApp')
  .controller('LogoutCtrl', function($location, $auth) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        $location.path('/');
      });
  });