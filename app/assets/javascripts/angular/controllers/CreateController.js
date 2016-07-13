App.controller('CreateCtrl',['$scope','$state','localuser','Order','Shipment', function($scope,$state, localuser, Order, Shipment){
	if (localuser) $scope.inherit.user = localuser;

	$scope.inherit.loading = false;

	$scope.local = {
		order:{
			from:,
			to:"",
			base64_image: null,
			message: "",
			price: 0,
			reward: 0,
			total_price: 0,
			quantity: 1
		},
		shipment:{
			from:"",
			to:"",
			date: new Date(),
			message: ""
		}
	}

	newOrder = function(){
		$scope.local.order.from = $scope.local.anywhere?["Anywhere"]:$scope.local.order.from
		$scope.inherit.loading = true;
		$scope.local.order.total_price = $scope.local.order.reward + $scope.local.order.price*$scope.local.order.quantity + $scope.local.order.price*$scope.local.order.quantity*0.03
		Order.create({token:$scope.inherit.user.token}, {order:$scope.local.order}, function(res) {
			$scope.inherit.loading = false;
			$scope.inherit.goState('orders');
		})
	}

	newShipment = function(shipment){
		$scope.inherit.loading = true;
		Shipment.create({token:$scope.inherit.user.token}, {shipment:$scope.local.shipment}, function(res) {
			$scope.inherit.loading = false;
			$scope.inherit.goState('shipments');
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
	$scope.publishOrder = function(){
		if (!$scope.inherit.user){
			$scope.inherit.openSignin().then(function(res){newOrder()});
		}else{
			newOrder()
		}
	}
	$scope.publishShipment = function(){
		if (!$scope.inherit.user) $scope.inherit.openSignin().then(function(res){newShipment()});
		else newShipment()
	}


}]);
