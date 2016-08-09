App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', 'Message', function($scope,$state, localuser, shipments, Message){

	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		shipments: shipments
	}
	$scope.toOptions = {
		types: ['(cities)'],
	}
	$scope.fromOptions = {

	}
	console.log($scope.local.data_to_show);

	$scope.sendMessage = function(order, shipment){
		console.log($scope.local.new_message.text);
		message = {text:$scope.local.new_message.text, sender:shipment.user.id, recipient: order.user.id}
		$scope.inherit.loading = true
		Message.create({shipment_id:shipment.id, order_id:order.id}, {message:message}, function(res) {
			$scope.inherit.loading = false
			shipment.messages.push(res)
			$scope.local.new_message.text = '';
		});
	}

}]);
