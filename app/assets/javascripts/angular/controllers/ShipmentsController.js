App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', function($scope,$state, localuser, shipments){

	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		shipments: shipments
	}
	$scope.toOptions = {
		types: ['(cities)'],
	}
	$scope.fromOptions = {

	}
	console.log($scope.local.shipments);
}]);
