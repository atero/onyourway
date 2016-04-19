
App.factory('Order',['$resource',function($resource){

	return $resource(api_endpoint+'/orders/', {id:'@id'},
	{
		create: { method:"POST", params: {}, isArray : false }
	});
}]);

// App.factory('User',['$resource',function($resource){
	
// 	return $resource(api_endpoint+'v1/users/:id/', {id:'@id'},
// 	{
// 		show: { method:"GET", params: {id :'@id'}, isArray : false },
// 		index: { method:"GET", params: {}, isArray : true },
// 		create: { method:"POST", params: {}, isArray : false },
// 		update: { method:"PUT", params: {id :'@id'}, isArray : false }
// 	});

// }]);

