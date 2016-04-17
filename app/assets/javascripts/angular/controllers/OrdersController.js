App.controller('OrdersCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	if (localuser) $scope.inherit.user = localuser;
	$scope.local={
		orders: Requests.filter(function(d){return d.name == "Mane S"})
	}

}]);