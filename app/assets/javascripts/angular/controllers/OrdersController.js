App.controller('OrdersCtrl',['$scope','$state','localuser', 'orders', function($scope,$state, localuser, orders){
	if (localuser) $scope.inherit.user = localuser;

	$scope.inherit.loading = false;

	$scope.local={
		orders: orders
	}

}]);