App.controller('FaqCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	if (localuser) $scope.inherit.user = localuser;
	ga('set', 'page', '/faq');
	ga('send', 'pageview');
	$scope.local={

	}

}]);
