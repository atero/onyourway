App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', 'Order', 'Message', function($scope, $state, localuser, shipments, Order, Message){

	if (localuser) $scope.inherit.user = localuser;
	$scope.local={
		shipments: shipments
	}
	if (shipments){
		if (shipments.length > 0){
			$scope.local.shipmen_to_show = shipments[0];
			if(shipments[0].orders && shipments[0].orders.length > 0){
				$scope.local.data_to_show = shipments[0].orders[0];
			}
		}
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
	};

	$scope.sendToken = function(order, shipment){
		console.log(order.confirm_token + " Tok");
		var confirm = "";
		if(order.confirm_token != ''){
			if (order.confirm_token == order.accepted_token) {
				console.log("true");
				console.log(order.confirm_token);
				console.log(order.accepted_token);
 				confirm = true;
			}
			else {
				console.log(order.confirm_token);
				console.log(order.accepted_token);
					console.log("false");
				confirm = false;
			}
			Order.update({
			  id: order.id
			}, {
			  order: order
			}, function(res) {
				location.reload();
			})
		}
	}
}]);
