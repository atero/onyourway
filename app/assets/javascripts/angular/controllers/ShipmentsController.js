App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', 'Order', 'Message', function($scope, Order, $state, localuser, shipments, Message){

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

	$scope.sendToken = function(order, shipment){
		if($scope.acc_token != ''){
			order.confirm_token = $scope.acc_token;
			Order.update({
			  id: order.id
			}, {
			  order: order
			}, function(res) {

			})
		}
	}


}]);
