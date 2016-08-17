App.controller('PayoutCtrl',['$scope','$state','localuser', function($scope,$state, localuser){
	if (localuser) $scope.inherit.user = localuser;
	$scope.local={
		spa_list:["FI", "AT", "BE", "BG", "EE","HR","CY", "CZ", "DK", "FL", "FR", "GF", "DE", "GI", "GP", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MQ", "YT", "MC", "NL", "NO", "PL", "PT", "RE", "RO", "BL", "MF", "PM", "SK", "SI", "ES", "SE", "CH", "GB"]
	};

}]);
