App.controller('CreateCtrl',['$scope','$state', function($scope,$state){
	
	$scope.local = {
		request:{
			from:[],
			to:"",
			date: new Date()
		},
		delivery:{
			from:"",
			to:"",
			date: new Date(),
		}
	}

	if($scope.inherit.usertype == "shopper"){
		$scope.local.stages=[true, false, false, false]
	}else{
		$scope.local.stages=[true]
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
	$scope.publishRequest = function(){
		console.log("triggered")
		$scope.inherit.openSignin()
	}

}]);