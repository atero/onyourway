App.controller('MainCtrl',['$scope','$rootScope', 'Auth','$state','$stateParams','$window','Auth',"$uibModal", "$q", function($scope,$rootScope,Auth,$state,$stateParams,$window,Auth,$uibModal, $q){
    
    $rootScope.$on('$stateChangeStart', function(){
        $scope.inherit.loading = true;
    })

    $rootScope.$on('$stateChangeSuccess', function(){
        $scope.inherit.loading = false;
    })

    closeModal = function(credentials){
    	if(credentials.type == 'signin'){
			Auth.login(credentials.user).then(function(user) {
				if(user){$scope.inherit.user = user}
				return user
			},function(error) {
		        toastr.error(error.data.error);
		        if(error.data.error=="Account does not existe."){
		        	return null
		        }
		    });
    	}else{
			Auth.register(credentials.user).then(function(user) {
				return user
			},function(error) {
		        toastr.error(error.data.error);
		        if(error.data.error=="Account does not exist."){
		        	return null
		        }
		    });
    	}
    }

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

			modalInstance.result.then(function (credentials) {
				d.resolve(closeModal(credentials))
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
				d.resolve(closeModal(credentials))
			})
			return d.promise
		}
	};

}])
