App.controller('ModalCtrl', ['$scope', '$uibModalInstance', "order_id", function($scope, $uibModalInstance, order_id) {
  $scope.local = {
    shipment: {
      order_id: order_id,
      from: null,
      to: null
    }
  }
  $scope.with_order = true;
  if (order_id == 'noid') {
    $scope.with_order = false;
  }
  $scope.ok = function(isValid) {
    if (isValid) {
      if ($scope.local.validated) {
        $uibModalInstance.close($scope.local.shipment)
      } else {
        $scope.local.validated = true
      }
    }
		else{
			$('.ng-invalid').addClass('error');
			$('.ng-valid').removeClass('error');
		}
  }

  $scope.cancel = function() {
    if ($scope.local.validated) {
      $scope.local.validated = false
    } else {
      $uibModalInstance.close()
    }
  }

  $scope.countrylist = countrylist

  $scope.local.result = '';

  $scope.local.options = {
    country: '',
    types: '(cities)'
  };

  $scope.local.details = '';

}]);

App.controller('LoginCtrl', ['$scope', '$uibModalInstance', 'type', function($scope, $uibModalInstance, type) {

  $scope.local = {
    type: type
  }

  $scope.signin = function() {
    $uibModalInstance.close($scope.local)
  }

  $scope.signup = function(isValid) {
    if (isValid) {
      $uibModalInstance.close($scope.local)
      fbq('track', 'CompleteRegistration');
    }

  }

  $scope.change_type = function() {
    $scope.local.type = ($scope.local.type == "signin") ? "signup" : "signin"
  }
}]);
