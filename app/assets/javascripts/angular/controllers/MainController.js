App.controller('MainCtrl',['$scope','$state','$stateParams','$window','Auth', function($scope,$state,$stateParams,$window,Auth){

	$scope.inherit = {
		usertype: "shopper",
		goSearch:function(){
			$state.go('results')
		},
		goCreate:function(){
			$state.go('create')
		},
		countrylist: countrylist
	};

}])
