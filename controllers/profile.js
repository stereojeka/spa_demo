angular.module('mainApp')
  .controller('ProfileCtrl', function($scope, $auth, Account) {
    $scope.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          console.log(response.data.message, response.status);
        });
    };
    $scope.updateProfile = function() {
      Account.updateProfile($scope.user)
        .then(function() {
          console.log('Profile has been updated');
        })
        .catch(function(response) {
          console.log(response.data.message, response.status);
        });
    };

    $scope.getProfile();
  });
