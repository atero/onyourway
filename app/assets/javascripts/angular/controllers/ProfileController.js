App.controller('ProfileCtrl', ['$scope', '$state', 'localuser', 'User', function($scope, $state, localuser, User) {

  if (localuser) $scope.inherit.user = localuser;
  console.log($scope.inherit.user);
  if (!!$scope.inherit.user.birthdate) {
    var today = = new Date($scope.inherit.user.birthdate);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;
    $scope.inherit.user.birthdate = today;
  }
  $scope.local = {
    user: {

    }
  }

  $scope.saveProfile = function() {
    console.log("saving");
    $scope.inherit.loading = true;
    User.update({
      token: $scope.inherit.user.token,
      id: $scope.inherit.user._id
    }, {
      user: $scope.inherit.user
    }, function(res) {
      $scope.inherit.loading = false;
      //$scope.inherit.goState('pr');
    })
  };

}]);
