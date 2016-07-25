App.controller('ProfileCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	if (localuser) $scope.inherit.user = localuser;
	console.log($scope.inherit.user);

	$scope.local={

	}

	$scope.saveProfile = () =>{
		console.log(saving);
	}

}]);
