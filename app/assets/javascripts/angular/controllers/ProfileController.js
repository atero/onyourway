App.controller('ProfileCtrl',['$scope','$state','localuser', 'User', function($scope,$state, localuser, User){

	if (localuser) $scope.inherit.user = localuser;
	console.log($scope.inherit.user);
	if(!!$scope.inherit.user.birthdate){
		//$scope.inherit.user.birthdate = new Date($scope.inherit.user.birthdate);
	}
	$scope.local={
		user:{

		}
	}

	$scope.saveProfile = function(){
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
