App.controller('ResultsCtrl',['$scope','$state', "$uibModal",'localuser','orders','Shipment','Message', function($scope,$state,$uibModal, localuser, orders, Shipment, Message){
	if (localuser) $scope.inherit.user = localuser;
	$scope.inherit.usertype = 'traveller'
	
	
	$scope.local={
		results: orders
	}

	$scope.local.citylist = _.uniq(orders.map(function(d){return d.to})).sort()
	$scope.local.countrylist = [].concat.apply([], _.uniq(orders.map(function(d){return d.from}))).sort()
	

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

newShipments = function(shipment, result){

	$scope.inherit.loading = true;

	Shipment.create({id:shipment.order_id}, {shipment:shipment}, function(res) {
		
		Message.create({shipment_id:res._id}, {message:{text:shipment.message, sender:$scope.inherit.user._id, recipient: result.user_id}}, function(res) {
			$scope.inherit.loading = false;
			$scope.inherit.goState("shipments")
		})
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
			if (!$scope.inherit.user) {
				$scope.inherit.openSignin().then(function(res){
					newShipments(shipment, result)
				});
			}else{
				newShipments(shipment, result)
			}
		}
     })
}





}]);