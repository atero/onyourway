App.controller('ResultsCtrl',['$scope','$state', "$uibModal",'localuser','orders', function($scope,$state,$uibModal, localuser, orders){
	if (localuser) $scope.inherit.user = localuser;
	$scope.inherit.usertype = 'traveller'

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
	
 $scope.propose = function (type, result) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templateModal.html',
      controller: 'ModalCtrl',
      size: "md",
      resolve: {
        result: function () {
          return result;
        },
        type: function () {
          return type;
        },
      }
    });
	
	modalInstance.result.then(function (message) {
      	if (!$scope.inherit.user){
      		$scope.inherit.openSignin().then(function(user){
      		})
      	}else{
      	}

     })
}





}]);