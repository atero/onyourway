App.controller('ModalCtrl',['$scope','$uibModalInstance', "order_id", function($scope,$uibModalInstance,order_id){
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

App.controller('LoginCtrl',['$scope', '$uibModalInstance', 'type', function($scope, $uibModalInstance, type){
	$scope.local={
		type:type
	}

	$scope.signin = function(){
		$uibModalInstance.close($scope.local)
	}

	$scope.signup = function(){
		$uibModalInstance.close($scope.local)
	}

	$scope.change_type = function(){
		$scope.local.type = ($scope.local.type == "signin")?"signup":"signin"
	}
}]);