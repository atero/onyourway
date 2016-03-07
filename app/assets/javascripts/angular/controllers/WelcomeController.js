App.controller('WelcomeCtrl',['$scope','$state', function($scope,$state){

	$scope.local={

		goSearch:function(){
			$state.go('results')
		}
	}

}]);