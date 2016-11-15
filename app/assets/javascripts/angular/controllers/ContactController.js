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
     console.log($scope.contact_name);
     //$scope.inherit.loading = true;
     message = {text: "from contact form"};
     Message.create({shipment_id:0, order_id:0}, {message:message}, function(res) {
       $scope.inherit.loading = false
       shipment.messages.push(res)
       $scope.local.new_message.text = '';
     });
   }


}]);
