App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', function($scope,$state, localuser, shipments){

	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		shipments: shipments
	}
	console.log($scope.local.shipments.orders);
}]);
