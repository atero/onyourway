App.controller('MainCtrl',['$scope','$rootScope', 'Auth','$state','$stateParams','$window','Auth',"$uibModal", "$q", function($scope,$rootScope,Auth,$state,$stateParams,$window,Auth,$uibModal, $q){

  $(document).on('click',function(){
    if ($('.collapse').css('display') == 'block') {
      $('.collapse').collapse('hide');
    }
  })

    $rootScope.$on('$stateChangeStart', function(){
        $scope.inherit.loading = true;
    })

    $rootScope.$on('$stateChangeSuccess', function(){
        $scope.inherit.loading = false;
    })

    closeModal = function(credentials){
    	var deferred = $q.defer();
    	if(credentials.type == 'signin'){
			Auth.login(credentials.user).then(function(user) {
				if(user){$scope.inherit.user = user}
				deferred.resolve(user)
			},function(error) {
		        toastr.error(error.data.error);
		        if(error.data.error=="Account does not existe."){
		        	deferred.resolve(null)
		        }
		    });
    	}else{
			Auth.register(credentials.user).then(function(user) {
				if(user){
					Auth.login(credentials.user).then(function(user) {
						$scope.inherit.user = user
						deferred.resolve(user)
					})
				}
			},function(error) {
		        toastr.error(error.data.error);
		        if(error.data.error=="Account does not exist."){
		        	deferred.resolve(null)
		        }
		    });
    	}
    	return deferred.promise
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
			$scope.inherit.loading = true
			Auth.logout().then(function(res){
				$scope.inherit.user = null;
				$scope.inherit.loading = false;
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
				closeModal(credentials).then(function(user){
					d.resolve(user)
				})
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
				closeModal(credentials).then(function(user){
					d.resolve(user)
				})
			})
			return d.promise
		}
	};

    $scope.inherit.result = '';

    $scope.inherit.options = {
      country: '',
      types: '(cities)'
    };

    $scope.inherit.details = '';

}])
