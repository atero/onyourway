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

	$scope.sendMessage = function(order,shipment){
		message = {text:$scope.local.new_message.text, sender:$scope.inherit.user._id, recipient: order.user.id}
		$scope.inherit.loading = true
		console.log(shipment);
		Message.create({shipment_id:shipment.id}, {message:message}, function(res) {
			$scope.inherit.loading = false
			shipment.messages.push(res)
			$scope.local.new_message.text = '';
		})
	}

}]);
