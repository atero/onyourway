App.controller('ModalCtrl',['$scope','$uibModalInstance', '$windowProvider', "order_id", function($scope,$uibModalInstance,order_id,$windowProvider){
	var $window = $windowProvider.$get();
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

	$scope.signup = function(isValid){
		if (isValid) {
      $uibModalInstance.close($scope.local)
			_fbq.push(['track','899238753537316', {'action' : 'signup'}]);
			$window.fbq('track', 'CompleteRegistration');
    }

	}

	$scope.change_type = function(){
		$scope.local.type = ($scope.local.type == "signin")?"signup":"signin"
	}
}]);
