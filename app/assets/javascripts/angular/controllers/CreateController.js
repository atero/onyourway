App.controller('CreateCtrl',['$scope','$state', function($scope,$state){
	
	$scope.local = {}

	if($scope.inherit.usertype == "traveller"){
		$scope.local.stages=[true, false, false, false]
	}else{
		$scope.local.stages=[true, false]
	}


}]);