App.controller('CreateCtrl',['$scope','$state', function($scope,$state){
	
	$scope.local = {}

	if($scope.inherit.usertype == "traveller"){
		$scope.local.stages=[true, false, false, false]
	}else{
		$scope.local.stages=[true, false]
	}

	$scope.stepForward = function(){
		curr_stage = $scope.local.stages.indexOf(true)
		$scope.local.stages[curr_stage] = false
		$scope.local.stages[curr_stage+1] = true
	}
	$scope.stepBack= function(){
		curr_stage = $scope.local.stages.indexOf(true)
		$scope.local.stages[curr_stage] = false
		$scope.local.stages[curr_stage-1] = true
	}

}]);