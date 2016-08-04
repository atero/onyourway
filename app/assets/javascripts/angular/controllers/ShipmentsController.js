App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', function($scope,$state, localuser, shipments){

	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		shipments: shipments
	}
	console.log($scope.local.shipments);


	$scope.setOrder = function(order){
		$scope.local.conversation_shipment = null
		$scope.local.data_to_show = order;
		if ($scope.local.data_to_show.accepted_shipment) {
			$scope.local.conversation_shipment = $scope.local.data_to_show.shipments.filter(function(d){return d.status == "accepted"})[0]
		}
	}


}]);
