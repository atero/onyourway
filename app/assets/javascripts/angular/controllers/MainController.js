App.controller('MainCtrl',['$scope','Auth','$state','$stateParams','$window','Auth',"$uibModal", "$q", function($scope,Auth,$state,$stateParams,$window,Auth,$uibModal, $q){

	$scope.inherit = {
		user: null,
		loading: false,
		usertype: "shopper",
		currentState: function(){
			return $state.current.name
		},
		goState:function(state){
			$state.go(state)
		},
		countrylist: countrylist,
		logOut: function(){
			Auth.logout();
			$scope.inherit.user = null;
			$state.go('welcome')
		},
		openSignup: function(){
			var d = $q.defer();
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
					$scope.inherit.loading = true;
					Auth.register(credentials.user).then(function(user) {
						$scope.inherit.user = user
						$scope.inherit.loading = false;
						d.resolve(user)
					},function(error) {
				        toastr.error(error.data.error);
				        if(error.data.error=="Account does not existe."){
				        	$scope.inherit.loading = false;
				        	d.resolve(null)
				        }
				    });
			})
			return d.promise
		},
		openSignin: function(){
			var d = $q.defer();
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

			modalInstance.result.then(function (credentials) {
					$scope.inherit.loading = true;
					Auth.login(credentials.user).then(function(user) {
						$scope.inherit.user = user
						$scope.inherit.loading = false;
						d.resolve(user)
					},function(error) {
				        toastr.error(error.data.error);
				        if(error.data.error=="Account does not existe."){
				        	$scope.inherit.loading = false;
				        	d.resolve(null)
				        }
				    });
			})
			return d.promise
		}
	};

}])
