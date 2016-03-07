App.controller('ResultsCtrl',['$scope','$state', function($scope,$state){
	
	var monthNames = [
	  " January ", " February ", " March ",
	  " April ", " May ", " June ", " July ",
	  " August ", " September ", " October ",
	  " November ", " December "
	];

	var getResults = function(){
		console.log("here")
		if($scope.inherit.usertype == 'traveller'){
			return Requests
		}else{
			return Proposals.map(function(d){d.date = "" + d.day + monthNames[d.month-1] + d.year; return d})
		}
	}

	$scope.local={
		results: getResults()
	}
	





}]);