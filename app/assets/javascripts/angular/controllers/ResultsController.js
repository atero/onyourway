App.controller('ResultsCtrl',['$scope','$state', "$uibModal",'localuser','orders','Shipment', function($scope,$state,$uibModal, localuser, orders, Shipment){
	if (localuser) $scope.inherit.user = localuser;
	$scope.inherit.usertype = 'traveller'
	
	$scope.inherit.loading = false;
	
	$scope.local={
		results: orders
	}

	$scope.search = {
		to:"",
		from:""
	}
	$scope.filterResults = function(){
		filtered = orders
		if($scope.search.from && $scope.search.from!=""){
			filtered = filtered.filter(function(d){
				return d.from.indexOf($scope.search.from) > -1
			})
		}
		if($scope.search.to && $scope.search.to!=""){
			filtered = filtered.filter(function(d){
				return d.to.indexOf($scope.search.to) > -1
			})
		}
		return filtered	
	}

newShipments = function(shipment){
	$scope.inherit.loading = true;

	console.log(shipment)

	Shipment.create({id:shipment.order_id}, {shipment:shipment}, function(res) {
		$scope.inherit.loading = false;
	})
}

 $scope.propose = function (type, result) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templateModal.html',
      controller: 'ModalCtrl',
      size: "md",
      resolve: {
        order_id: function () {
          return result.id;
        }
      }
    });
	
	modalInstance.result.then(function (shipment) {
		if(shipment){
			if (!$scope.inherit.user) $scope.inherit.openSignin().then(newShipments(shipment));
			else newShipments(shipment)
		}
     })
}





}]);