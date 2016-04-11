App.controller('ResultsCtrl',['$scope','$state', "$uibModal", function($scope,$state,$uibModal){
	$scope.inherit.usertype == 'shopper'
	var monthNames = [
	  " January ", " February ", " March ",
	  " April ", " May ", " June ", " July ",
	  " August ", " September ", " October ",
	  " November ", " December "
	];

	var getResults = function(){
		if($scope.inherit.usertype == 'traveller'){
			return Requests
		}else{
			return Proposals.map(function(d){d.date = "" + d.day + monthNames[d.month-1] + d.year; return d})
		}
	}

	$scope.local={
		results: getResults()
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
      	console.log(message)
      })
}





}]);