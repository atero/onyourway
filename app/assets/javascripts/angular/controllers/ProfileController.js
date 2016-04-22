App.controller('ProfileCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	if (localuser) $scope.inherit.user = localuser;
	$scope.inherit.loading = false;
	$scope.local={

	}

}]);