App.controller('AboutCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	if (localuser) $scope.inherit.user = localuser;
	$scope.local={

	}

}]);
