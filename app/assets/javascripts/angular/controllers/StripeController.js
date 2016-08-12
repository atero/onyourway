App.controller('StripeCtrl',['$scope','$uibModalInstance', "payment_details", function($scope,$uibModalInstance,payment_details){

	$scope.payment_details = payment_details;
	console.log(payment_details);

}]);
