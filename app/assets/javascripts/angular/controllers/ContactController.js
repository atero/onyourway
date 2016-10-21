App.controller('ContactCtrl',['$scope','$uibModalInstance','$window', function($scope,$uibModalInstance, $window){

  $(document).on('click',function(){
    if ($('.collapse').css('display') == 'block') {
      $('.collapse').collapse('show');
    }
  })
  // $scope.contact_us = function() {
  //   $uibModalInstance.close($scope.local)
  // }

  $scope.cancel = function() {
    if ($scope.local.validated) {
      $scope.local.validated = false
    } else {
      $uibModalInstance.close()
    }
  }
  $scope.openContact = function(){
    $scope.modal.show();
      // var d = $q.defer();
    //   var modalInstance = $uibModal.open({
    //     animation: $scope.animationsEnabled,
    //     templateUrl: 'templateContact.html',
    //     controller: 'ContactCtrl',
    //     size: "md",
    //     resolve: {
    //       }
    // })

  }


}]);
