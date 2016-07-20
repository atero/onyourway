App.controller('OrdersCtrl',['$scope', '$state','localuser', 'orders', 'Shipment', 'Order', 'Message', function($scope, $state, localuser, orders, Shipment, Order, Message){
	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		orders: orders,
		conversation_shipment: null
	}
	console.log($scope.local.orders);
	
	$scope.accept_travel = function(order, shipment){
		order.accepted_shipment = true;

	  	shipment.status = "accepted"
	  	$scope.local.conversation_shipment = shipment
	  	Shipment.update({id: shipment.id}, {shipment:shipment}, function(res){
	  		// some callback if needed
	  	})
	}

	$scope.refuse_travel = function(order, shipment){

		swal({
		  title: 'Are you sure you want to definitely delete this shipment from the list?',
		  text: "You won't be able to see this shipment any more!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}, function(isConfirm) {
		  if (isConfirm) {
		  	shipment.status = "refused"
		  	Shipment.update({id: shipment.id}, {shipment:shipment})
		  }
		})


	}

	$scope.setOrder = function(order){
		$scope.local.conversation_shipment = null
		$scope.local.data_to_show = order;
		if ($scope.local.data_to_show.accepted_shipment) {
			$scope.local.conversation_shipment = $scope.local.data_to_show.shipments.filter(function(d){return d.status == "accepted"})[0]
		}
	}

	$scope.sendMessage = function(order,shipment){
		message = {text:$scope.local.new_message.text, sender:$scope.inherit.user._id, recipient: shipment.user.id}
		$scope.inherit.loading = true
		Message.create({shipment_id:shipment.id}, {message:message}, function(res) {
			$scope.inherit.loading = false
			shipment.messages.push(res)
		})
	}

}]);
