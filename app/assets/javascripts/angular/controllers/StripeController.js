App.controller('StripeCtrl',['$scope','$uibModalInstance', "payment_details", function($scope,$uibModalInstance,order_id){
	$scope.local={
		shipment: {
			order_id: order_id,
			from: null,
			to: null
		}
	}
	$scope.ok = function(){
		if($scope.local.validated){
			$uibModalInstance.close($scope.local.shipment)
		}else{
			$scope.local.validated = true
		}
	}

	$scope.cancel = function(){
		if($scope.local.validated){
			$scope.local.validated = false
		}else{
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
