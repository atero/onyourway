App.controller('ProfileCtrl',['$scope','$state','localuser', 'User', function($scope,$state, localuser, User){

	if (localuser) $scope.inherit.user = localuser;
	console.log($scope.inherit.user);

	$scope.local={
		user:{

		}
	}

	$scope.saveProfile = function(){
		console.log("saving");
		$scope.inherit.loading = true;
		User.update({
      token: $scope.inherit.user.token,
			id: $scope.inherit.user.id
    }, {
      user: $scope.inherit.user
    }, function(res) {
      $scope.inherit.loading = false;
      //$scope.inherit.goState('pr');
    })
	};

}]);
