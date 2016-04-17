App.controller('ShipmentsCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	
	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		shipments: Shipments
	}

}]);