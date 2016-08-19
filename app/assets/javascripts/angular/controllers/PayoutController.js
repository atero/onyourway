App.controller('PayoutCtrl', ['$scope', '$state', 'localuser', 'User', function($scope, $state, localuser, User) {
  if (localuser) $scope.inherit.user = localuser;
  $scope.local = {
    payout: {
      spa_list: ["Åland Islands", "Aland Islands",,"Austria", "Belgium", "Bulgaria", "Canary Islands", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "French Guiana", "Germany", "Gibraltar", "Greece", "Guadeloupe", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Martinique", "Mayotte", "Monaco", "Netherlands", "Norway", "Poland", "Portugal", "Réunion", "Reunion", "Romania", "Saint Barthélemy","Saint Barthelemy", "Saint Martin", "Saint Pierre and Miquelon", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom"],
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
    if (!!$scope.inherit.user.country && $scope.local.payout.spa_list.indexOf($scope.inherit.user.country) > 0) {
      $scope.inherit.user.is_spa = true;
    } else {
      $scope.inherit.user.is_spa= false;
    }
  }


}]);
