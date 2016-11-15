App.controller('ContactCtrl',['$scope','$uibModalInstance','$window', 'Message', function($scope,$uibModalInstance, $window, Message){

  $('#contact-opacity').on('click',function(){
     $('.modal').css({"background-color":"rgba(0,0,0,0.4)", "margin-top":"66px"});
  });
  // if ('click') {
  //   console.log("main");
  //   $(".modal").css({"background-color":"rgba(0,0,0,0.4)", "margin-top":"66px"});
  // }
  $scope.cancel = function() {
    if ($scope.validated) {
      $scope.validated = false
    } else {
      $uibModalInstance.close()
    }
   }

   $scope.sendContactMessage = function(){
     $scope.inherit.loading = true;
     message = {text: "from contact form"};
     console.log('Contacting!');
     Message.create({shipment_id:0, order_id:0}, {message:message}, function(res) {
       $scope.inherit.loading = false
       shipment.messages.push(res)
       $scope.local.new_message.text = '';
     });
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
