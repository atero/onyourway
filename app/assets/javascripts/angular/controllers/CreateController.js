App.controller('CreateCtrl',['$scope','$state','localuser','Order', 'FileUploader', function($scope,$state, localuser, Order, FileUploader){
	if (localuser) $scope.inherit.user = localuser;

	$scope.uploader = new FileUploader({url: 'orders/', method: 'POST'});
	console.log($scope.uploader)
	$scope.local = {
		order:{
			from:[],
			to:"",
			date: new Date(),
			photo: null
		},
		delivery:{
			from:"",
			to:"",
			date: new Date(),
		},
		linkFile: function($files){
			console.log($files)
			$scope.local.order.photo=$files[0];
		}		
	}

	newOrder = function(){
		  $scope.upload = function (file) {
		    new FileUploader.upload({
		      url: 'orders/',
		      method: 'POST',
		      headers: { 'Content-Type': false },
		      fields: {
		        'post[item]': order.item,
		        'post[photo]': file
		      },
		      file: file,
		      sendFieldsAs: 'json'
		    }).then(function (resp) {
		      console.log('Success ' + resp.config.file.name + 'uploaded. Response: ' + resp.data);
		    }, function (resp) {
		      console.log('Error status: ' + resp.status);
		    }, function (evt) {
		      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		    });
		  };
		// Order.create({
  //         user_id: $scope.inherit.user._id
  //       }, {order:$scope.local.order}, function(res) {console.log(res)})
	}

	if($scope.inherit.usertype == "shopper"){
		$scope.local.stages=[true, false, false, false]
	}else{
		$scope.local.stages=[true]
	}

	$scope.stepForward = function(){
		curr_stage = $scope.local.stages.indexOf(true)
		$scope.local.stages[curr_stage] = false
		$scope.local.stages[curr_stage+1] = true
	}
	$scope.stepBack= function(){
		curr_stage = $scope.local.stages.indexOf(true)
		$scope.local.stages[curr_stage] = false
		$scope.local.stages[curr_stage-1] = true
	}
	$scope.publishRequest = function(){
		if (!$scope.inherit.user) $scope.inherit.openSignin().then(newOrder());
		else newOrder()
	}

}]);