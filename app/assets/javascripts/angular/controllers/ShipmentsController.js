App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', function($scope,$state, localuser, shipments){
	
	if (localuser) $scope.inherit.user = localuser;

	$scope.inherit.loading = false;

	$scope.local={
		shipments: shipments
	}

}]);