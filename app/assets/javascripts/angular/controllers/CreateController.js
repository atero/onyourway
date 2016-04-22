App.controller('CreateCtrl',['$scope','$state','localuser','Order', function($scope,$state, localuser, Order){
	if (localuser) $scope.inherit.user = localuser;

	$scope.local = {
		order:{
			from:[],
			to:"",
			date: new Date(),
			base64_image: null,
			message: "",
			price: 0,
			reward: 0,
			total_price: 0,
			quantity: 1
		},
		delivery:{
			from:"",
			to:"",
			date: new Date(),
		}
	}

	newOrder = function(){
		$scope.inherit.loading = true;
		$scope.local.order.total_price = $scope.local.order.reward + $scope.local.order.price*$scope.local.order.quantity + $scope.local.order.price*$scope.local.order.quantity*0.03
		Order.create({}, {order:$scope.local.order}, function(res) {
			$scope.inherit.loading = false;
		})
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
		if (!$scope.inherit.user) $scope.inherit.openSignin().then(newOrder());
		else newOrder()
	}

}]);