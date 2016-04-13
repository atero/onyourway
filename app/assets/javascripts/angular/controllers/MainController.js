App.controller('MainCtrl',['$scope','$state','$stateParams','$window','Auth',"$uibModal", function($scope,$state,$stateParams,$window,Auth,$uibModal){

	$scope.inherit = {
		usertype: "shopper",
		goSearch:function(){
			$state.go('results')
		},
		goCreate:function(){
			$state.go('create')
		},
		countrylist: countrylist,
		openSignup: function(){
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'templateLogin.html',
				controller: 'LoginCtrl',
				size: "md",
				resolve: {
					type: function () {
						return "signup";
					}
				}
			});

			modalInstance.result.then(function (user) {
				console.log(user)
			})
		},
		openSignin: function(){
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'templateLogin.html',
				controller: 'LoginCtrl',
				size: "md",
				resolve: {
					type: function () {
						return "signin";
					}
				}
			});

			modalInstance.result.then(function (user) {
				console.log(user)
			})
		}
	};

}])
