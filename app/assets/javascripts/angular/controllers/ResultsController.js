App.controller('ResultsCtrl',['$scope','$state', "$uibModal",'localuser', function($scope,$state,$uibModal, localuser){
	if (localuser) $scope.inherit.user = localuser;
	$scope.inherit.usertype = 'traveller'
	// var monthNames = [
	//   " January ", " February ", " March ",
	//   " April ", " May ", " June ", " July ",
	//   " August ", " September ", " October ",
	//   " November ", " December "
	// ];

	$scope.local={
		results: Requests
	}

	$scope.search = {
		to:"",
		from:""
	}
	$scope.filterResults = function(){
		filtered = Requests
		console.log($scope.search.to)
		if($scope.search.from && $scope.search.from!=""){
			filtered = filtered.filter(function(d){
				return d.from.indexOf($scope.search.from) > -1
			})
		}
		$scope.search = $scope.search.to.charAt(0).toUpperCase() + $scope.search.to.slice(1);
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
      			console.log(user, message)
      		})
      	}else{
			console.log($scope.inherit.user, message)
      	}

     })
}





}]);