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

	$scope.signup = function(isValid){
		if (isValid) {
      $uibModalInstance.close($scope.local);
			!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
			n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
			t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
			document,'script','https://connect.facebook.net/en_US/fbevents.js');

			fbq('init', '899238753537316');
			 fbq('track', 'CompleteRegistration');
    }

	}

	$scope.change_type = function(){
		$scope.local.type = ($scope.local.type == "signin")?"signup":"signin"
	}
}]);
