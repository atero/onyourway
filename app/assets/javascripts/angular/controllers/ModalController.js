App.controller('ModalCtrl',['$scope','$uibModalInstance', "type", "result", function($scope,$uibModalInstance,type, result){
	$scope.local={
		usertype:type,
		ad: result
	}
	$scope.ok = function(){
		if($scope.local.validated){
			$uibModalInstance.close($scope.local)
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
}]);