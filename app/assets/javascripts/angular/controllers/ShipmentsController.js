App.controller('ShipmentsCtrl',['$scope','$state','localuser', 'shipments', 'Message', function($scope,$state, localuser, shipments, Message){

	if (localuser) $scope.inherit.user = localuser;

	$scope.local={
		shipments: shipments
	}
	$scope.toOptions = {
		types: ['(cities)'],
	}
	$scope.fromOptions = {

	}
	console.log($scope.local.shipments);

	$scope.sendMessage = function(order, shipment){
		console.log($scope.local.new_message.text);
		message = {text:$scope.local.new_message.text, sender:shipment.user.id, recipient: order.user.id}
		$scope.inherit.loading = true
		Message.create({shipment_id:shipment.id, order_id:order.id}, {message:message}, function(res) {
			$scope.inherit.loading = false
			shipment.messages.push(res)
			$scope.local.new_message.text = '';
		});
	}


	var myApp = angular.module('myApp',[]);
myApp
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
myApp.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function(){
                    alert('image exist');
                }).error(function(){
                    alert('image not exist');
                    element.attr('src', 'https://shopnship.herokuapp.com/images/nophoto.png'); // set default image
                });
            });
        }
    };
});

function myCtrl($scope){
    $scope.img = 'http://www.example.com/image_not_exist.png'; // img not exist
}



}]);
