App.controller('ContactCtrl',['$scope','$uibModalInstance','$window', 'Message', 'localuser', 'User', function($scope,$uibModalInstance, $window, Message, localuser, User){

  $('#contact-opacity').on('click',function(){
     $('.modal').css({"background-color":"rgba(0,0,0,0.4)", "margin-top":"66px"});
  });
  // if ('click') {
  //   console.log("main");
  //   $(".modal").css({"background-color":"rgba(0,0,0,0.4)", "margin-top":"66px"});
  // }
  if (localuser) $scope.inherit.user = localuser;
  $scope.cancel = function() {
    if ($scope.validated) {
      $scope.validated = false
    } else {
      $uibModalInstance.close()
    }
   }

   $scope.sendContactMessage = function(){
     console.log($scope.user.contact_name);
     $scope.inherit.loading = true;
     message = {text: "from contact form"};
     Message.create({shipment_id:0, order_id:0}, {message:message}, function(res) {
       $scope.inherit.loading = false
       shipment.messages.push(res)
       $scope.local.new_message.text = '';
     });
   }


}]);
