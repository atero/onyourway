App.controller('MainCtrl',['$scope','$rootScope', 'Auth','$state','$stateParams','$window','Auth',"$uibModal", "$q", function($scope,$rootScope,Auth,$state,$stateParams,$window,Auth,$uibModal, $q){
    
    $rootScope.$on('$stateChangeStart', function(){
        $scope.inherit.loading = true;
    })

    $rootScope.$on('$stateChangeSuccess', function(){
        $scope.inherit.loading = false;
    })

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
			Auth.logout().then(function(res){
				$scope.inherit.user = null;
				$state.go('welcome')
			});
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
					Auth.register(credentials.user).then(function(user) {
						$scope.inherit.user = user
						d.resolve(user)
					},function(error) {
				        toastr.error(error.data.error);
				        if(error.data.error=="Account does not exist."){
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
					Auth.login(credentials.user).then(function(user) {
						$scope.inherit.user = user
						d.resolve(user)
					},function(error) {
				        toastr.error(error.data.error);
				        if(error.data.error=="Account does not existe."){
				        	d.resolve(null)
				        }
				    });
			})
			return d.promise
		}
	};

}])
