App.controller('PayoutCtrl', ['$scope', '$state', 'localuser', 'User', function($scope, $state, localuser, User) {
  if (localuser) $scope.inherit.user = localuser;
  $scope.local = {
    payout: {
      spa_list: ["FI", "AT", "BE", "BG", "EE", "HR", "CY", "CZ", "DK", "FL", "FR", "GF", "DE", "GI", "GP", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MQ", "YT", "MC", "NL", "NO", "PL", "PT", "RE", "RO", "BL", "MF", "PM", "SK", "SI", "ES", "SE", "CH", "GB"],
    }
  };

  $scope.fromOptions = {

  }

  $scope.save_payout = function(){
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

  $scope.check_list = function() {
    if (!!$scope.local.payout.country.address_components && $scope.local.payout.spa_list.indexOf($scope.local.payout.country.address_components[0].short_name) > 0) {
      $scope.is_spa = true;
    } else {
      $scope.is_spa = false;
    }
  }


}]);
