App.controller('PayoutCtrl', ['$scope', '$state', 'localuser', function($scope, $state, localuser) {
  if (localuser) $scope.inherit.user = localuser;
  $scope.local = {
    payout: {
      spa_list: ["FI", "AT", "BE", "BG", "EE", "HR", "CY", "CZ", "DK", "FL", "FR", "GF", "DE", "GI", "GP", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MQ", "YT", "MC", "NL", "NO", "PL", "PT", "RE", "RO", "BL", "MF", "PM", "SK", "SI", "ES", "SE", "CH", "GB"],
    }
  };

  $scope.fromOptions = {

  }
  $scope.check_list = () => {
    if (!!$scope.local.payout.country && spa_list.indexOf($scope.local.payout.country) > 0) {
      console.log($scope.local.payout.country);
      $scope.is_spa = true;
    } else {
      $scope.is_spa = false;
    }
  }


}]);
