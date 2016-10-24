App.controller('ContactCtrl',['$scope','$uibModalInstance','$window', function($scope,$uibModalInstance, $window){

  $('#contact-opacity').on('click',function(){
      $('.modal').css("background", "rgba(0,0,0,0.4)");
  });

  $scope.cancel = function() {
    if ($scope.validated) {
      $scope.validated = false
    } else {
      $uibModalInstance.close()
    }
   }

   // 	$scope.sendMessage = function(order, shipment){
   // 		console.log($scope.local.new_message.text);
   // 		message = {text:$scope.local.new_message.text, sender:shipment.user.id, recipient: order.user.id}
   // 		$scope.inherit.loading = true
   // 		Message.create({shipment_id:shipment.id, order_id:order.id}, {message:message}, function(res) {
   // 			$scope.inherit.loading = false
   // 			shipment.messages.push(res)
   // 			$scope.local.new_message.text = '';
   // 		});
   // 	};
    //
   // 	$scope.send_contact_message = function(order, shipment){
   // 		console.log(order.confirm_token + " Tok");
   // 		if(order.confirm_token != ''){
   // 			Order.update({
   // 			  id: order.id
   // 			}, {
   // 			  order: order
   // 			}, function(res) {
   // 				location.reload();
   // 			})
   // 		}
   // 	}



}]);
